import React from 'react';
import {StatusBar, View} from 'react-native';
import {Button, IconButton, Logo} from '../../components';
import {
  addAlignItems,
  addDirection,
  addFlex,
  addJustifyContent,
  addPadding,
  colors,
  sizes,
} from '../../theme';
import {setToken} from '../../utils';
import {useInitialized, useToken} from '../../store';

export const LoginScreen = () => {
  const {saveToken} = useToken();
  const {initialized} = useInitialized();

  function initSession() {
    // save a token to the app;
    setToken({
      token: Date.now(),
    });

    saveToken(true);
  }

  function onInitialized() {
    // TODO: ask for finger print here
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
      <StatusBar
        backgroundColor={colors.gray.default}
        barStyle="light-content"
      />
      <View
        style={[
          addFlex(1),
          addAlignItems('center'),
          addJustifyContent('center'),
        ]}>
        <Logo />
      </View>
      <View style={[addDirection('row'), addPadding('xl')]}>
        {!initialized && <Button title="Let's go" onPress={initSession} />}
        {initialized && (
          <IconButton
            icon="fingerprint"
            type="MaterialCommunity"
            size={sizes['2xl']}
            color={colors.yellow.default}
            onPress={onInitialized}
          />
        )}
      </View>
    </View>
  );
};
