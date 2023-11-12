import React from 'react';
import {View} from 'react-native';
import {ActionCard, AppHeader} from '../../components';
import {addPadding, colors} from '../../theme';
import {HomeStackTypes} from '../../navigation';
import {useNavigator} from '../../hooks';
import {STORAGE_KEY_STATE_INITIALIZED, clearAll, setValue} from '../../utils';
import {useInitialized, useToken} from '../../store';

export const SettingsScreen = () => {
  const navigate = useNavigator<HomeStackTypes>();
  const {saveToken} = useToken();
  const {saveInitialized} = useInitialized();

  function navigateBack() {
    navigate.goBack(['home', undefined]);
  }

  async function onClearAll() {
    // TODO: ask before deleting this
    clearAll();
    saveInitialized(undefined);
    saveToken(undefined);
  }

  async function onInitialize() {
    setValue({initialized: true}, STORAGE_KEY_STATE_INITIALIZED);

    saveInitialized(true);
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
      <ActionCard
        title="Clear storage"
        desc="this action will remove all the data saved within the app."
        icon="delete-circle"
        color={colors.white.default}
        background={colors.red.default}
        textColor={colors.white.default}
        type="MaterialCommunity"
        onPress={onClearAll}
      />
      <View style={addPadding('normal')} />
      <ActionCard
        title="Add fingerprint"
        desc="Add your fingerprint so that no one else can get in."
        icon="fingerprint"
        color={colors.yellow.default}
        type="MaterialCommunity"
        onPress={onInitialize}
      />
    </View>
  );
};
