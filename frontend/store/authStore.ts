import { create } from 'zustand';
import { User } from '~/types';

export interface authState {
  sessionUser: User | null;
  sessionToken: string | null;
  setSessionUser: (user: User) => void;
  setSessionToken: (token: string) => void;
  clearSession: () => void;
}

const useAuthStore = create<authState>((set) => ({
  sessionUser: null,
  sessionToken: null,
  setSessionUser: (user: User) =>
    set((state) => {
      return {
        sessionUser: user,
      };
    }),

  setSessionToken: (token: string) =>
    set((state) => {
      return { sessionToken: token };
    }),
  clearSession: () =>
    set((state) => {
      return {
        sessionToken: null,
        sessionUser: null,
      };
    }),
}));

export default useAuthStore;
