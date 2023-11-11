import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '../../../theme';
import {HomeScreen} from '../../../screens';

export type HomeStackTypes = {
  home: undefined;
};

const Stack = createStackNavigator<HomeStackTypes>();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.white[500],
        },
      }}>
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
