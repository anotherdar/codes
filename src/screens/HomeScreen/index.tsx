import React from 'react';
import {View} from 'react-native';

import {ActionCard, AppHeader} from '../../components';
import {addPadding, colors} from '../../theme';
import {HomeStackTypes} from '../../navigation';
import {useNavigator} from '../../hooks';

export const HomeScreen = () => {
  const navigation = useNavigator<HomeStackTypes>();

  function gotoSettings() {
    navigation.navigate('settings');
  }

  function gotoAddCard() {
    navigation.navigate('addCardHome');
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
      <ActionCard
        title="Let’s get thing running!"
        desc="by adding a new key card."
        icon="circle-plus"
        color={colors.gray.default}
        type="FontAwesome6"
        onPress={gotoAddCard}
      />
      <View style={addPadding('normal')} />
      {/* fingerprint action */}
      <ActionCard
        title="Keep it secured"
        desc="Add your fingerprint so that no one else can get in."
        icon="fingerprint"
        color={colors.yellow.default}
        type="MaterialCommunity"
        onPress={gotoSettings}
      />
    </View>
  );
};
