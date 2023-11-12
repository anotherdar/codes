import React from 'react';
import {View} from 'react-native';
import {Button, Logo} from '../../components';
import {
  addAlignItems,
  addDirection,
  addFlex,
  addJustifyContent,
  addPadding,
} from '../../theme';
import {setToken} from '../../utils';
import {useToken} from '../../store';

export const LoginScreen = () => {
  const {saveToken} = useToken();

  function initSession() {
    setToken({
      token: Date.now(),
    });
    saveToken(true);
  }

  return (
    <View
      style={[
        addPadding('default'),
        addFlex(1),
        addAlignItems('center'),
        addJustifyContent('center'),
      ]}>
      <View
        style={[
          addFlex(1),
          addAlignItems('center'),
          addJustifyContent('center'),
        ]}>
        <Logo />
      </View>
      <View style={[addDirection('row'), addPadding('xl')]}>
        <Button title="Let's go" onPress={initSession} />
      </View>
    </View>
  );
};
