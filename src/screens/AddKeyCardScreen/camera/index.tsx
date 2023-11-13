import React from 'react';
import {View} from 'react-native';
import {ActionCard, AppHeader} from '../../../components';
import {addPadding, colors} from '../../../theme';
import {HomeStackTypes} from '../../../navigation';
import {useNavigator} from '../../../hooks';

export const AddKeyCardCameraScreen = () => {
  const navigator = useNavigator<HomeStackTypes>();

  function navigateBack(): void {
    navigator.goBack(['home']);
  }

  function gotoSettings() {
    navigator.navigate('settings');
  }

  return (
    <View style={[addPadding('default')]}>
      <AppHeader
        name="Camera"
        left={{
          icon: 'chevron-left',
          type: 'MaterialCommunity',
        }}
        leftAction={navigateBack}
        right={{
          icon: 'gear',
          type: 'FontAwesome6',
        }}
        rightAction={gotoSettings}
      />
      <View style={addPadding('normal')} />
      {/* add card */}

      <ActionCard
        title="Work in progress"
        desc="We're still working on this action."
        icon="face-grin-beam-sweat"
        color={colors.white.default}
        background={colors.green[600]}
        textColor={colors.white.default}
        type="FontAwesome6"
        onPress={navigateBack}
      />
    </View>
  );
};
