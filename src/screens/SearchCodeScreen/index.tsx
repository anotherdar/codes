import React, {useMemo, useRef, useState} from 'react';
import {
  StatusBar,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Text,
  ToastAndroid,
} from 'react-native';
import {
  addAlignItems,
  addBorder,
  addBorderRadius,
  addColor,
  addDirection,
  addFlex,
  addFontWeight,
  addJustifyContent,
  addPadding,
  colors,
  fontSize,
  sizes,
} from '../../theme';
import {AppHeader, Button, IconBuilder} from '../../components';
import {useNavigator} from '../../hooks';
import {HomeStackTypes} from '../../navigation';
import {RouteProp, useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';

type Search = {
  search: {
    card: KeyCard;
  };
};

export const SearchCodeScreen = () => {
  const navigator = useNavigator<HomeStackTypes>();
  const {
    params: {
      card: {name, codes},
    },
  } = useRoute<RouteProp<Search>>();

  const inputRefs = useRef<TextInput | null>(null);
  const [query, setQuery] = useState('');

  const memoList = useMemo(() => {
    const localCodes = codes.map((code, i) => {
      return {id: (i + 1).toString(), code};
    });

    const [current] = localCodes.filter(code => {
      return code.id === query;
    });

    return current;
  }, [codes, query]);

  function navigateBack(): void {
    navigator.goBack(['home']);
  }

  function openMore() {}

  function focusInput() {
    inputRefs.current?.focus();
  }

  function searchCode(text: string) {
    setQuery(text);
  }

  function onCopy() {
    Clipboard.setString(memoList?.code.toString());

    Keyboard.dismiss();

    ToastAndroid.show('Code copied', ToastAndroid.SHORT);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        {/* Search */}
        <Pressable
          onPress={focusInput}
          style={[
            addDirection('row'),
            addAlignItems('center'),
            addBorderRadius('sm'),
            addPadding('sm', 'padding'),
            addPadding('md', 'paddingHorizontal'),
            addColor(colors.gray[700], 'borderColor'),
            addBorder(2),
          ]}>
          <TextInput
            ref={ref => (inputRefs.current = ref)}
            style={[
              addFlex(1),
              addColor(colors.white.default, 'color'),
              fontSize('normal'),
            ]}
            placeholder="SEARCH BY CODE"
            placeholderTextColor={colors.gray[700]}
            keyboardType="numeric"
            value={query}
            maxLength={2}
            onChangeText={searchCode}
          />
          {/*  */}
          <View>
            <IconBuilder
              icon="search"
              size={sizes.default}
              color={colors.gray[700]}
            />
          </View>
        </Pressable>
        {/* Copy */}
        <View style={addPadding('normal')} />
        {/* Body */}
        <View
          style={[
            addPadding('sm'),
            addFlex(1),
            addJustifyContent('center'),
            addAlignItems('center'),
          ]}>
          {!memoList && (
            <View
              style={[addAlignItems('center'), addJustifyContent('center')]}>
              <IconBuilder
                icon="file"
                type="FontAwesome6"
                color={colors.gray[700]}
                size={sizes['3xl'] * 2}
              />
              <View style={addPadding('sm')} />
              <Text
                style={[
                  addColor(colors.gray[700], 'color'),
                  addFontWeight('bold'),
                ]}>
                No code to show
              </Text>
            </View>
          )}
          {memoList && (
            <Text
              style={[
                addColor(colors.white[500], 'color'),
                fontSize('2xl'),
                addFontWeight('bold'),
              ]}>
              {memoList?.code}
            </Text>
          )}
        </View>
        {/*  */}
        <View style={[addPadding('default')]}>
          <Button disabled={!memoList?.code} title="Copy" onPress={onCopy} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
