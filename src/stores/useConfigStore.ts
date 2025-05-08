import { create } from 'zustand';

interface ConfigStore {
  prefix: string;
  language: string;
  setPrefix: (prefix: string) => Promise<boolean>;
  setLanguage: (language: string) => Promise<boolean>;
}

export const useConfigStore = create<ConfigStore>((set) => ({
  prefix: '.',
  language: 'ru',
  
  setPrefix: async (prefix) => {
    try {
      const response = await fetch('/api/prefix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prefix }),
      });

      const data = await response.json();
      if (response.ok && data.ok) {
        set({ prefix: data.prefix });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Ошибка при установке префикса:', error);
      return false;
    }
  },

  setLanguage: async (language) => {
    try {
      const response = await fetch('/api/lang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lang: language }),
      });

      const data = await response.json();
      if (response.ok && data.ok) {
        set({ language: data.lang });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Ошибка при установке языка:', error);
      return false;
    }
  },
}));
