import React from 'react';
import {View} from 'react-native';
import {AppHeader} from '../../../components';
import {addPadding} from '../../../theme';
import {HomeStackTypes} from '../../../navigation';
import {useNavigator} from '../../../hooks';

export const AddKeyCardHomeScreen = () => {
  const navigator = useNavigator<HomeStackTypes>();

  function navigateBack(): void {
    navigator.goBack(['home']);
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
      />
      <View style={addPadding('normal')} />
    </View>
  );
};
