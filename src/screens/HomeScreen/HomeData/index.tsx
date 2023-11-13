import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useNavigator} from '../../../hooks';
import {HomeStackTypes} from '../../../navigation';
import {useCards} from '../../../store';
import {
  addAlignItems,
  addColor,
  addDirection,
  addFlex,
  addFontWeight,
  addJustifyContent,
  addPadding,
  addRadius,
  colors,
  sizes,
} from '../../../theme';
import {FlatList} from 'react-native-gesture-handler';
import {IconBuilder} from '../../../components/IconBuilder/index';
import {IconButton} from '../../../components';

export const HomeData = () => {
  const navigation = useNavigator<HomeStackTypes>();
  const {cards} = useCards();

  const gotoAddCard = () => navigation.navigate('addCardHome');
  const gotoKeyCard = (card: KeyCard) => {
    return () => {
      navigation.navigate('search', {
        card,
      });
    };
  };

  return (
    <View style={[addFlex(1)]}>
      <View style={[addFlex(1)]}>
        <FlatList
          data={cards}
          keyExtractor={item => `${item.id.toString()}-${Date.now()}`}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={gotoKeyCard(item)}
                key={`${item.id.toString()}-${Date.now()}`}
                style={({pressed}) => {
                  return {
                    ...addColor(colors.white.default),
                    ...addRadius('borderRadius', 'sm'),
                    ...addDirection('row'),
                    ...addAlignItems('center'),
                    opacity: pressed ? 0.8 : 1,
                  };
                }}>
                <View
                  style={[
                    addRadius('borderBottomLeftRadius', 'sm'),
                    addRadius('borderTopLeftRadius', 'sm'),
                    addPadding('xl', 'paddingVertical'),
                    addPadding('sm', 'paddingHorizontal'),
                    addColor(colors.gray.default),
                  ]}
                />
                <View
                  style={[
                    addFlex(1),
                    addDirection('row'),
                    addPadding('sm'),
                    addAlignItems('center'),
                  ]}>
                  <IconBuilder
                    size={sizes.default}
                    color={colors.gray.default}
                    icon="credit-card-check"
                    type="MaterialCommunity"
                  />
                  <View style={[addPadding('xs')]} />
                  <Text
                    style={[
                      addColor(colors.gray.default, 'color'),
                      addFontWeight('bold'),
                    ]}>
                    {item.name}
                  </Text>
                </View>
                <View style={[addFlex(0.1)]}>
                  <IconBuilder
                    color={colors.gray.default}
                    icon="chevron-right"
                    type="MaterialCommunity"
                    size={sizes.default}
                  />
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      {/* here */}
      <View
        style={[
          addPadding('sm'),
          addJustifyContent('center'),
          addAlignItems('center'),
        ]}>
        <IconButton
          size={sizes['3xl']}
          icon="circle-plus"
          type="FontAwesome6"
          hideBackground
          onPress={gotoAddCard}
        />
      </View>
    </View>
  );
};
