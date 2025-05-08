import { create } from 'zustand';

type Tab = 'store' | 'config';
type Stage = 'register' | 'app' | 'loading';

interface AppState {
  stage: Stage;
  tab: Tab;
  setStage: (stage: Stage) => void;
  setTab: (tab: Tab) => void;
  checkInitialization: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  stage: 'loading',
  tab: 'store',
  setStage: (stage) => set({ stage }),
  setTab: (tab) => set({ tab }),
  checkInitialization: async () => {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();

      if (data.initialized) {
        set({ stage: 'app' });
      } else {
        set({ stage: 'register' });
      }
    } catch (err) {
      console.error('Ошибка при проверке инициализации:', err);
      set({ stage: 'register' });
    }
  },
}));
