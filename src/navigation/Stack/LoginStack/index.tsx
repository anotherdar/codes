import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '../../../theme';
import {LoginScreen} from '../../../screens';

export type LoginStackTypes = {
  login: undefined;
};

const Stack = createStackNavigator<LoginStackTypes>();

export const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.gray.default,
        },
      }}>
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
