import React from 'react';
import {View} from 'react-native';

import {AppHeader} from '../../components';
import {addPadding} from '../../theme';
import {HomeStackTypes} from '../../navigation';
import {useNavigator} from '../../hooks';
import {HomeEmpty} from './EmptyState';

export const HomeScreen = () => {
  const navigation = useNavigator<HomeStackTypes>();

  function gotoSettings() {
    navigation.navigate('settings');
  }

  return (
    <View style={[addPadding('default')]}>
      <AppHeader
        right={{
          icon: 'gear',
          type: 'FontAwesome6',
        }}
        rightAction={gotoSettings}
      />
      <View style={addPadding('normal')} />
      <HomeEmpty />
    </View>
  );
};
