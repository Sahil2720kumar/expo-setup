import { create } from 'zustand';
import { User } from '~/types';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthState {
  sessionUser: User | null;
  sessionToken: string | null;
  setSessionUser: (user: User) => void;
  setSessionToken: (token: string) => void;
  clearSession: () => void;
}

const authStorage = {
  getItem: async (key: string) => {
   // console.log("secure storeage");
    
    return await SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      sessionUser: null,
      sessionToken: null,
      setSessionUser: (user: User) =>
        set(() => ({
          sessionUser: user,
        })),
      setSessionToken: (token: string) =>
        set(() => ({
          sessionToken: token,
        })),
      clearSession: () =>
        set(() => ({
          sessionUser: null,
          sessionToken: null,
        })),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => (Platform.OS === 'web' ? AsyncStorage : authStorage)),
    }
  )
);

export default useAuthStore;
