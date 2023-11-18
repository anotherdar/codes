import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  ActionCard,
  AppHeader,
  AlertMessage,
  BottomSheet,
  IconBuilder,
  Button,
  Separator,
} from '../../components';
import {
  addAlignItems,
  addFontWeight,
  addPadding,
  addTextAlign,
  colors,
} from '../../theme';
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
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

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
      onClearAll();
      return;
    }
    askForBiometrics({
      onSuccessCallback: onClearAll,
      promptMessage: 'Want to delete all?',
    });
  }

  function handleDeleteNotification(status: boolean) {
    return () => {
      setIsDismissed(status);
    };
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
                  ? 'By removing your finger print your getting your data open to anyone.'
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
          onPress={handleDeleteNotification(true)}
        />
        <BottomSheet
          title="Removing your data?"
          onDismiss={handleDeleteNotification(false)}
          visible={isDismissed}>
          <View
            style={[
              addPadding('xl', 'paddingVertical'),
              addAlignItems('center'),
            ]}>
            <View
              style={[
                addPadding('xl', 'paddingVertical'),
                addAlignItems('center'),
              ]}>
              <IconBuilder
                icon="circle-info"
                type="FontAwesome6"
                size={68}
                color={colors.red.default}
              />
              <Separator />
              <Text style={[addTextAlign('center'), addFontWeight('bold')]}>
                By clicking on confirm all your data will be removed from this
                device
              </Text>
            </View>
            <Button title="Clean it" onPress={askForDeleteData} />
          </View>
        </BottomSheet>
      </ScrollView>
    </View>
  );
};
