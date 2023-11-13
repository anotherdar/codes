import React from 'react';
import {View, Text} from 'react-native';
import {IconButton} from '..';
import {
  sizes,
  colors,
  addPadding,
  addAlignItems,
  addJustifyContent,
} from '../../theme';
import {useBiometrics} from '../../hooks';
import {useToken} from '../../store';
import {setToken} from '../../utils';

export const BiometricsButton: React.FC = () => {
  const {errorMessage, askForBiometrics} = useBiometrics();

  const {saveToken} = useToken();

  function onSuccessCallback() {
    setToken({
      token: Date.now(),
    });

    saveToken(true);
  }

  function handleAuth() {
    askForBiometrics({
      onSuccessCallback,
      promptMessage: 'Keep it secret.',
    });
  }

  return (
    <View style={[addAlignItems('center'), addJustifyContent('center')]}>
      <IconButton
        icon="fingerprint"
        type="MaterialCommunity"
        size={sizes['2xl']}
        color={colors.yellow.default}
        onPress={handleAuth}
      />
      <View style={addPadding('sm')} />
      <Text>{errorMessage}</Text>
    </View>
  );
};
