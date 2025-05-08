import { create } from 'zustand';

interface RegisterStore {
  token: string;
  pin: string;
  error: {
    token: boolean;
    pin: boolean;
  };
  setToken: (token: string) => void;
  setPin: (pin: string) => void;
  validate: () => boolean;
  submit: () => Promise<{ success: boolean; error?: string }>;
  resetErrors: () => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterStore>((set, get) => ({
  token: '',
  pin: '',
  error: {
    token: false,
    pin: false,
  },

  setToken: (token) => set((state) => ({ token, error: { ...state.error, token: false } })),
  setPin: (pin) => set((state) => ({ pin, error: { ...state.error, pin: false } })),

  resetErrors: () => set({ error: { token: false, pin: false } }),

  validate: () => {
    const { token, pin } = get();
    const errors = {
      token: !token.trim(),
      pin: !/^\d{4}$/.test(pin),
    };
    set({ error: errors });
    return !(errors.token || errors.pin);
  },

  submit: async () => {
    const isValid = get().validate();
    if (!isValid) return { success: false };

    try {
      const formData = new FormData();
      formData.append('token', get().token);

      const res = await fetch('https://giant-waves-sing.loca.lt/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.status === 'success') {
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (err) {
      console.error('Ошибка при отправке токена:', err);
      return { success: false, error: 'Произошла ошибка сети' };
    }
  },

  reset: () => {
    set({ token: '', pin: '', error: { token: false, pin: false } });
  },
}));
