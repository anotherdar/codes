import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {IconButton} from '../../components';
import {
  sizes,
  colors,
  addPadding,
  addAlignItems,
  addJustifyContent,
} from '../../theme';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

export const SandboxScreen: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleAuth = async () => {
    try {
      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage: 'Keep it secret',
      });

      if (success) {
        setErrorMessage('Authentication succeeded!');
      } else {
        setErrorMessage(`Authentication failed: ${error}`);
      }
    } catch (error) {
      console.error('Biometrics Error: ', error);
      setErrorMessage('Biometric authentication not available on this device.');
    }
  };

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
