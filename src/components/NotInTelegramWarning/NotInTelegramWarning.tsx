import React from 'react';
import { AppRoot, List, Section, Blockquote } from '@telegram-apps/telegram-ui';
import { TimelineSection } from '../TimelineSection/TimelineSection';

const timelineItems = [
  {
    header: 'Откройте BotFather',
    description: 'Перейдите в Telegram и найдите @BotFather — официальный бот для управления другими ботами.',
  },
  {
    header: 'Выберите своего бота',
    description: 'Нажмите /mybots → выберите вашего бота из списка.',
  },
  {
    header: 'Настройте Web App',
    description: 'Зайдите в Bot Settings → Configure Web Apps → Add Web App.',
  },
  {
    header: 'Введите параметры',
    description:
      'Укажите название (например, "Tensai Panel") и ссылку на веб-приложение (например, https://ваш-домен или https://yourdomain.com).',
  },
  {
    header: 'Сохраните и запустите',
    description: 'После сохранения вернитесь в чат с ботом — появится кнопка запуска Web App.',
  },
];

export const NotInTelegramWarning = () => {
  return (
    <AppRoot>
      <List>
        <Section header="Как подключить Web App">
          <Blockquote type="text" className='quote'>
            Чтобы открыть Tensai через Telegram, сначала подключите ссылку Web App к вашему боту через BotFather.
            Ниже — пошаговая инструкция.
          </Blockquote>
        </Section>

        <Section header="Инструкция по подключению">
          <TimelineSection items={timelineItems} active={5} />
        </Section>
      </List>
    </AppRoot>
  );
};
