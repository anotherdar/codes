import {useEffect} from 'react';
import {LogBox} from 'react-native';

export function useIgnore() {
  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested inside plain ScrollViews',
    ]);
  }, []);
}
