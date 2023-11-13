import {useState} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

export function useBiometrics() {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const askForBiometrics = async ({
    promptMessage,
    onSuccessCallback,
  }: askForBiometricsProps) => {
    try {
      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage,
      });

      if (success) {
        onSuccessCallback();
      } else {
        setErrorMessage(`Authentication failed: ${error}`);
      }
    } catch (error) {
      console.error('Biometrics Error: ', error);
      setErrorMessage('Biometric authentication not available on this device.');
    }
  };

  return {
    errorMessage,
    askForBiometrics,
  };
}

export interface askForBiometricsProps {
  promptMessage: string;
  onSuccessCallback: () => void;
}
