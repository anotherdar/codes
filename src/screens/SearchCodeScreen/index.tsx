import React from 'react';
import {StatusBar, View} from 'react-native';
import {addColor, addFlex, addPadding, colors} from '../../theme';
import {AppHeader} from '../../components';
import {useNavigator} from '../../hooks';
import {HomeStackTypes} from '../../navigation';
import {RouteProp, useRoute} from '@react-navigation/native';

type Search = {
  search: {
    card: KeyCard;
  };
};

export const SearchCodeScreen = () => {
  const navigator = useNavigator<HomeStackTypes>();
  const {
    params: {
      card: {name},
    },
  } = useRoute<RouteProp<Search>>();

  function navigateBack(): void {
    navigator.goBack(['home']);
  }

  function openMore() {}

  return (
    <View
      style={[
        addPadding('default'),
        addFlex(1),
        addColor(colors.gray.default),
      ]}>
      <AppHeader
        name={name}
        left={{
          icon: 'chevron-left',
          type: 'MaterialCommunity',
          color: colors.white.default,
        }}
        leftAction={navigateBack}
        right={{
          icon: 'dots-vertical',
          type: 'MaterialCommunity',
          color: colors.white.default,
        }}
        rightAction={openMore}
        color={colors.white.default}
      />
      <View style={addPadding('normal')} />
      <StatusBar
        backgroundColor={colors.gray.default}
        barStyle="light-content"
      />
    </View>
  );
};
