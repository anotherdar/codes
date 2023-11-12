import React from 'react';
import {View} from 'react-native';
import {AppHeader} from '../../../components';
import {addPadding} from '../../../theme';
import {HomeStackTypes} from '../../../navigation';
import {useNavigator} from '../../../hooks';

export const AddKeyCardFormScreen = () => {
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
        name="New card"
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
    </View>
  );
};
