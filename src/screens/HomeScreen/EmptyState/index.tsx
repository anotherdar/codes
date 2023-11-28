import React from 'react';
import {View} from 'react-native';
import {ActionCard} from '../../../components';
import {colors, addPadding} from '../../../theme';
import {useNavigator} from '../../../hooks';
import {HomeStackTypes} from '../../../navigation';
import {useBiometricsAvailable, useCards, useInitialized} from '../../../store';
import {isEmpty} from '../../../utils';

export const HomeEmpty = () => {
  const navigation = useNavigator<HomeStackTypes>();
  const {initialized} = useInitialized();
  const {biometrics} = useBiometricsAvailable();
  const {cards} = useCards();

  function gotoSettings() {
    navigation.navigate('settings');
  }

  function gotoAddCard() {
    // navigation.navigate('addCardHome');
    navigation.navigate('addCardForm', {mode: 'new'});
  }

  if (!isEmpty(cards) && initialized) {
    return null;
  }

  return (
    <View>
      {isEmpty(cards) && (
        <ActionCard
          title="Let’s get things running!"
          desc="by adding a new key card."
          icon="circle-plus"
          color={colors.gray.default}
          type="FontAwesome6"
          onPress={gotoAddCard}
        />
      )}
      {isEmpty(cards) && <View style={addPadding('normal')} />}
      {/* fingerprint action */}
      {!initialized && biometrics && (
        <>
          <ActionCard
            title="Keep it secured"
            desc="Add your fingerprint so that no one else can get in."
            icon="fingerprint"
            color={colors.yellow.default}
            type="MaterialCommunity"
            onPress={gotoSettings}
          />
          <View style={addPadding('normal')} />
        </>
      )}
    </View>
  );
};
