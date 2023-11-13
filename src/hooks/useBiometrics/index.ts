import {useState} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import {STORAGE_KEY_STATE_FINGERPRINT_FAIL, setValue} from '../../utils';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

export function useBiometrics() {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isSensorAvailable = async () => {
    try {
      const {available} = await rnBiometrics.isSensorAvailable();

      return available;
    } catch (error) {
      console.error('Something went wrong', error);
      return false;
    }
  };

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
      // set an storage value to hide the biometrics
      setValue({fingerprint: false}, STORAGE_KEY_STATE_FINGERPRINT_FAIL);
    }
  };

  return {
    errorMessage,
    askForBiometrics,
    isSensorAvailable,
  };
}

export interface askForBiometricsProps {
  promptMessage: string;
  onSuccessCallback: () => void;
}
