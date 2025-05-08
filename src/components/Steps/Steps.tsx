import React, { useState } from 'react';
import { AppRoot, List, Section, Input, ButtonCell, Banner, Image } from '@telegram-apps/telegram-ui';
import { TimelineSection } from '../TimelineSection/TimelineSection';
import { useRegisterStore } from '../../stores/useRegisterStore';

const timelineItems = [
  {
    header: 'Ознакомление',
    description: 'Прочитайте несколько статей о том, что такое Tensai',
  },
  {
    header: 'Заполнение полей',
    description: 'Введите токен бота и PIN-код для доступа к web-интерфейсу',
  },
  {
    header: 'Завершение установки',
    description: 'Ознакомься с полезными ссылками и завершай установку',
  }
];

const stepOne = () => (
  <>
    <Banner before={<Image size={48} />} header="Безопасность" subheader="Никаких доступов к аккаунту и опасности" />
    <Banner before={<Image size={48} />} header="Удобство" subheader="Команды, инструкции и гайды для быстрого старта" />
    <Banner before={<Image size={48} />} header="Креативность" subheader="Не хвататает готовых модулей? Создай свои!" />
  </>
);

const stepThree = () => (
  <>
    <Banner before={<Image size={48} />} header="Быстрый старт" subheader="Инструкция по первым шагам" />
    <Banner before={<Image size={48} />} header="Чат поддержки" subheader="Чат с разработчиками и пользователями Tensai" />
    <Banner before={<Image size={48} />} header="Создание модулей" subheader="Документация по созданию модулей" />
  </>
);

export const Steps = ({ onComplete }: { onComplete: () => void }) => {
  const [activeItem, setActiveItem] = useState(0);

  const { token, pin, setToken, setPin, error, submit, resetErrors } = useRegisterStore();

  const stepTwo = () => (
    <>
      <Input
        header="Токен бота"
        placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
        value={token}
        onChange={(e) => {
          setToken(e.target.value);
          resetErrors();
        }}
        status={error.token ? 'error' : 'default'}
      />
      <Input
        header="PIN-код (4 символа)"
        placeholder="0000"
        type="number"
        value={pin}
        onChange={(e) => {
          setPin(e.target.value);
          resetErrors();
        }}
        status={error.pin ? 'error' : 'default'}
      />
    </>
  );

  const steps = [stepOne, stepTwo, stepThree];

  const nextStep = async () => {
    if (activeItem === 1) {
      const isValid = await submit();

      if (!isValid) return;
    }

    if (activeItem === steps.length - 1) {
      onComplete();
      return;
    }

    setActiveItem((prev) => Math.min(prev + 1, steps.length - 1));
  };

  return (
    <AppRoot>
      <List>
        <Section header="Шаги">
          <TimelineSection items={timelineItems} active={activeItem} />
        </Section>
        <Section header={`Шаг ${activeItem + 1}`}>
          {steps[activeItem]()}
          <ButtonCell onClick={nextStep}>
            {activeItem === steps.length - 1 ? 'Завершить' : 'Продолжить'}
          </ButtonCell>
        </Section>
      </List>
    </AppRoot>
  );
};
