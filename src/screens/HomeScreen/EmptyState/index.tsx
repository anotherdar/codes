import React from 'react';
import {View} from 'react-native';
import {ActionCard} from '../../../components';
import {colors, addPadding} from '../../../theme';
import {useNavigator} from '../../../hooks';
import {HomeStackTypes} from '../../../navigation';
import {useBiometricsAvailable, useInitialized} from '../../../store';

export const HomeEmpty = () => {
  const navigation = useNavigator<HomeStackTypes>();
  const {initialized} = useInitialized();
  const {biometrics} = useBiometricsAvailable();

  function gotoSettings() {
    navigation.navigate('settings');
  }

  function gotoAddCard() {
    navigation.navigate('addCardHome');
  }

  return (
    <View>
      <ActionCard
        title="Let’s get things running!"
        desc="by adding a new key card."
        icon="circle-plus"
        color={colors.gray.default}
        type="FontAwesome6"
        onPress={gotoAddCard}
      />
      <View style={addPadding('normal')} />
      {/* fingerprint action */}
      {!initialized && biometrics && (
        <ActionCard
          title="Keep it secured"
          desc="Add your fingerprint so that no one else can get in."
          icon="fingerprint"
          color={colors.yellow.default}
          type="MaterialCommunity"
          onPress={gotoSettings}
        />
      )}
    </View>
  );
};
