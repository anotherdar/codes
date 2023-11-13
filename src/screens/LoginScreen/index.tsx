import React from 'react';
import {StatusBar, View} from 'react-native';
import {Button, Logo, BiometricsButton} from '../../components';
import {
  addAlignItems,
  addDirection,
  addFlex,
  addJustifyContent,
  addPadding,
  colors,
} from '../../theme';
import {setToken} from '../../utils';
import {useBiometricsAvailable, useInitialized, useToken} from '../../store';

export const LoginScreen = () => {
  const {saveToken} = useToken();
  const {initialized} = useInitialized();
  const {biometrics} = useBiometricsAvailable();

  function initSession() {
    // save a token to the app;
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
        {(!initialized || !biometrics) && (
          <Button title="Let's go" onPress={initSession} />
        )}
        {/* <Button title="Let's go" onPress={initSession} /> */}

        {initialized && biometrics && <BiometricsButton />}
      </View>
    </View>
  );
};
