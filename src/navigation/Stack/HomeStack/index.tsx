import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '../../../theme';
import {
  HomeScreen,
  SettingsScreen,
  AddKeyCardHomeScreen,
  AddKeyCardFormScreen,
  AddKeyCardCameraScreen,
} from '../../../screens';

export type HomeStackTypes = {
  home: undefined;
  settings: undefined;
  addCardHome: undefined;
  addCardForm: {mode: 'edit' | 'new'};
  addCardCamera: undefined;
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
      <Stack.Screen name="settings" component={SettingsScreen} />
      <Stack.Screen name="addCardHome" component={AddKeyCardHomeScreen} />
      <Stack.Screen name="addCardForm" component={AddKeyCardFormScreen} />
      <Stack.Screen name="addCardCamera" component={AddKeyCardCameraScreen} />
    </Stack.Navigator>
  );
};
