import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export function useNavigator<T extends ParamListBase>() {
  const navigator = useNavigation<StackNavigationProp<T>>();

  function goBack(
    args: keyof T extends unknown
      ? undefined extends T[keyof T]
        ? [screen: keyof T] | [screen: keyof T, params: T[keyof T]]
        : [screen: keyof T, params: T[keyof T]]
      : never,
  ): void {
    if (navigator.canGoBack()) {
      navigator.goBack();
      return;
    }

    navigator.navigate(...args);
  }

  return {...navigator, goBack};
}
