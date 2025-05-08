import React from 'react';
import {
  List,
  Section,
  Input,
  Select,
} from '@telegram-apps/telegram-ui';
import { useConfigStore } from '../../stores/useConfigStore';

export const Config = () => {
  const { prefix, language, setPrefix, setLanguage } = useConfigStore();

  return (
    <List>
      <Section header="Конфиг Tensai">
        <Input
          header="Префикс команд"
          placeholder="Введите префикс"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
        />

        <Select
          header="Язык"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </Select>
      </Section>
    </List>
  );
};
