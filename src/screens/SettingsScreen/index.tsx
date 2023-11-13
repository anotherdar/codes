import React from 'react';
import {ScrollView, View} from 'react-native';
import {ActionCard, AppHeader, AlertMessage} from '../../components';
import {addPadding, colors} from '../../theme';
import {HomeStackTypes} from '../../navigation';
import {useBiometrics, useNavigator} from '../../hooks';
import {STORAGE_KEY_STATE_INITIALIZED, clearAll, setValue} from '../../utils';
import {
  useBiometricsAvailable,
  useCards,
  useInitialized,
  useToken,
} from '../../store';

export const SettingsScreen = () => {
  const navigate = useNavigator<HomeStackTypes>();
  const {saveToken} = useToken();
  const {saveInitialized, initialized} = useInitialized();
  const {askForBiometrics, errorMessage} = useBiometrics();
  const {saveCards} = useCards();
  const {biometrics} = useBiometricsAvailable();

  function navigateBack() {
    navigate.goBack(['home', undefined]);
  }

  async function onClearAll() {
    await clearAll();
    saveInitialized(false);
    saveToken(undefined);
    saveCards([]);
  }

  function onInitialize(status: boolean) {
    return () => {
      setValue({initialized: status}, STORAGE_KEY_STATE_INITIALIZED);

      saveInitialized(status);
    };
  }

  function askForEnablingBiometrics() {
    askForBiometrics({
      onSuccessCallback: onInitialize(!initialized || false),
      promptMessage: initialized
        ? 'Want to remove fingerprint?'
        : 'Want to setup fingerprint?',
    });
  }

  function askForDeleteData() {
    if (errorMessage || !initialized) {
      // TODO: add another method to delete the data for now just delete it;
      onClearAll();
      return;
    }
    askForBiometrics({
      onSuccessCallback: onClearAll,
      promptMessage: 'Want to delete all?',
    });
  }

  return (
    <View style={[addPadding('default')]}>
      <AppHeader
        name="Settings"
        left={{
          icon: 'chevron-left',
          type: 'MaterialCommunity',
        }}
        leftAction={navigateBack}
      />
      <View style={addPadding('normal')} />
      <ScrollView>
        {(errorMessage || !biometrics) && (
          <>
            <AlertMessage
              icon={{
                icon: 'information',
                type: 'MaterialCommunity',
                color: colors.gray.default,
              }}
              message={
                errorMessage ||
                'Biometric authentication is not available on this device.'
              }
              color={colors.gray.default}
              background={colors.yellow.default}
            />
            <View style={addPadding('sm')} />
          </>
        )}
        {biometrics && (
          <>
            <ActionCard
              title={`${!initialized ? 'Add' : 'Remove'} fingerprint`}
              desc={
                initialized
                  ? 'By removing your finger print your getting your data open to anyone'
                  : 'Add your fingerprint so that no one else can get in.'
              }
              icon="fingerprint"
              color={colors.yellow.default}
              type="MaterialCommunity"
              onPress={askForEnablingBiometrics}
            />
            <View style={addPadding('normal')} />
          </>
        )}
        <ActionCard
          title="Clear storage"
          desc="this action will remove all the data saved within the app."
          icon="delete-circle"
          color={colors.white.default}
          background={colors.red.default}
          textColor={colors.white.default}
          type="MaterialCommunity"
          onPress={askForDeleteData}
        />
      </ScrollView>
    </View>
  );
};
