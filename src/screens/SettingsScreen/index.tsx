import React from 'react';
import {ScrollView, View} from 'react-native';
import {ActionCard, AppHeader} from '../../components';
import {addPadding, colors} from '../../theme';
import {HomeStackTypes} from '../../navigation';
import {useBiometrics, useNavigator} from '../../hooks';
import {STORAGE_KEY_STATE_INITIALIZED, clearAll, setValue} from '../../utils';
import {useInitialized, useToken} from '../../store';

export const SettingsScreen = () => {
  const navigate = useNavigator<HomeStackTypes>();
  const {saveToken} = useToken();
  const {saveInitialized, initialized} = useInitialized();
  const {askForBiometrics} = useBiometrics();

  function navigateBack() {
    navigate.goBack(['home', undefined]);
  }

  async function onClearAll() {
    await clearAll();
    saveInitialized(false);
    saveToken(undefined);
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
        <View style={addPadding('normal')} />
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
      </ScrollView>
    </View>
  );
};
