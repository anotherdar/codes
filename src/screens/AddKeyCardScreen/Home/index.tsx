import React from 'react';
import {View} from 'react-native';
import {ActionCard, ActionItem, AppHeader} from '../../../components';
import {addPadding, colors} from '../../../theme';
import {HomeStackTypes} from '../../../navigation';
import {useNavigator} from '../../../hooks';

export const AddKeyCardHomeScreen = () => {
  const navigator = useNavigator<HomeStackTypes>();

  function navigateBack(): void {
    navigator.goBack(['home']);
  }

  function gotoSettings() {
    navigator.navigate('settings');
  }

  function gotoForm() {
    navigator.navigate('addCardForm', {mode: 'new'});
  }

  function gotoCamera() {
    navigator.navigate('addCardCamera');
  }

  return (
    <View style={[addPadding('default')]}>
      <AppHeader
        name="New Card"
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
        title="Take a photo"
        icon="camera"
        color={colors.white.default}
        background={colors.yellow.default}
        textColor={colors.white.default}
        type="FontAwesome6"
        onPress={gotoCamera}
      />
      <View style={addPadding('normal')} />
      <ActionItem
        label="Add manually"
        icon={{
          icon: 'file-circle-plus',
          type: 'FontAwesome6',
        }}
        onPress={gotoForm}
      />
    </View>
  );
};
