import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Store {
  token: boolean | undefined;
  saveToken: (token: Store['token']) => void;
}

const useStore = create(
  persist<Store>(
    set => {
      return {
        token: undefined,
        saveToken: token => set(() => ({token})),
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
