import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Store {
  token: boolean | undefined;
  saveToken: (token: Store['token']) => void;
  initialized: boolean | undefined;
  saveInitialized: (initialized: Store['initialized']) => void;
}

const useStore = create(
  persist<Store>(
    set => {
      return {
        token: undefined,
        saveToken: token => set(() => ({token})),
        initialized: undefined,
        saveInitialized: initialized => set({initialized}),
      };
    },
    {
      name: '@keep-it-secret-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useToken = () =>
  useStore(({token, saveToken}) => ({token, saveToken}));

export const useInitialized = () =>
  useStore(({initialized, saveInitialized}) => ({
    initialized,
    saveInitialized,
  }));
