import React from 'react';
import {Platform, View} from 'react-native';

import {AppHeader} from '../../components';
import {addFlex, addPadding} from '../../theme';
import {HomeStackTypes} from '../../navigation';
import {useNavigator} from '../../hooks';
import {HomeEmpty} from './EmptyState';
import {HomeData} from './HomeData';
import {STORAGE_KEY_STATE_CARDS, getValue, isEmpty} from '../../utils';
import {useFocusEffect} from '@react-navigation/native';
import {useCards} from '../../store';

export const HomeScreen = () => {
  const navigation = useNavigator<HomeStackTypes>();
  const {saveCards, cards} = useCards();

  useFocusEffect(
    React.useCallback(() => {
      async function init() {
        const {cards: localCards} = ((await getValue(
          STORAGE_KEY_STATE_CARDS,
        )) || {
          cards: [],
        }) as {
          cards: KeyCard[];
        };

        saveCards(localCards);
      }

      init();
    }, [saveCards]),
  );

  function gotoSettings() {
    navigation.navigate('settings');
  }

  console.log(`card > ${Platform.Version}`, cards, isEmpty(cards));

  return (
    <View style={[addPadding('default'), addFlex(1)]}>
      <AppHeader
        right={{
          icon: 'gear',
          type: 'FontAwesome6',
        }}
        name="Home"
        rightAction={gotoSettings}
      />
      <View style={addPadding('normal')} />
      <HomeEmpty />
      {!isEmpty(cards) && <HomeData />}
    </View>
  );
};
