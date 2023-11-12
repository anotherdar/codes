import React from 'react';
import {View} from 'react-native';
import {AppHeader} from '../../components';
import {addPadding} from '../../theme';
import {HomeStackTypes} from '../../navigation';
import {useNavigator} from '../../hooks';

export const SettingsScreen = () => {
  const navigate = useNavigator<HomeStackTypes>();

  function navigateBack() {
    navigate.goBack(['home', undefined]);
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
    </View>
  );
};
