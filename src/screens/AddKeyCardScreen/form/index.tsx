import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {AppHeader, Button, IconButton} from '../../../components';
import {
  addAlignItems,
  addBorderRadius,
  addColor,
  addDirection,
  addFlex,
  addFontWeight,
  addMargin,
  addPadding,
  addTextTransform,
  colors,
} from '../../../theme';
import {HomeStackTypes} from '../../../navigation';
import {useIgnore, useNavigator} from '../../../hooks';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {STORAGE_KEY_STATE_CARDS, getValue, setValue} from '../../../utils';

export const AddKeyCardFormScreen = () => {
  useIgnore();
  const navigator = useNavigator<HomeStackTypes>();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    id: '',
    codes: [''],
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCodeChange = (index: number, value: string) => {
    setFormData(prevData => {
      const newCodes = [...prevData.codes];
      newCodes[index] = value;
      return {
        ...prevData,
        codes: newCodes,
      };
    });
  };

  const handleAddCode = () => {
    setFormData(prevData => ({
      ...prevData,
      codes: [...prevData.codes, ''],
    }));
  };

  const handleRemoveCode = (index: number) => {
    setFormData(prevData => {
      const newCodes = [...prevData.codes];
      newCodes.splice(index, 1);
      return {
        ...prevData,
        codes: newCodes,
      };
    });
  };

  const handleSubmit = async () => {
    const {cards} = ((await getValue(STORAGE_KEY_STATE_CARDS)) || {
      cards: [],
    }) as {cards: KeyCard[]};

    const data = [...cards.filter(card => card.id !== formData.id), formData];

    setValue({cards: data}, STORAGE_KEY_STATE_CARDS);

    navigator.navigate('home');
  };

  function navigateBack(): void {
    navigator.goBack(['home']);
  }

  function gotoSettings() {
    navigator.navigate('settings');
  }

  function isValid() {
    return !(
      formData.id &&
      formData.name &&
      !!formData.codes.every(code => code && code.length === 4)
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <View style={addPadding('default')}>
          <AppHeader
            name="New card"
            left={{
              icon: 'chevron-left',
              type: 'MaterialCommunity',
            }}
            leftAction={navigateBack}
            right={{
              icon: 'gear',
              type: 'FontAwesome6',
            }}
            rightAction={gotoSettings}
          />
        </View>
        <KeyboardAwareScrollView>
          <View style={[addPadding('default'), addFlex(1)]}>
            {/* add card */}
            <View style={[addFlex(1)]}>
              <Text
                style={[
                  addColor(colors.gray.default, 'color'),
                  addFontWeight('bold'),
                  addTextTransform('uppercase'),
                ]}>
                Card info
              </Text>
              <View style={[addPadding('sm')]} />
              <TextInput
                placeholder="Name"
                value={formData.name}
                onChangeText={value => handleChange('name', value)}
                style={[
                  addPadding('md'),
                  addColor(colors.white.default),
                  addBorderRadius('sm'),
                  addFontWeight('500'),
                  addColor(colors.gray.default, 'color'),
                ]}
                placeholderTextColor={colors.gray.default}
              />
              <View style={[addPadding('sm')]} />
              <TextInput
                placeholder="ID"
                value={formData.id}
                onChangeText={value => handleChange('id', value)}
                style={[
                  addPadding('md'),
                  addColor(colors.white.default),
                  addBorderRadius('sm'),
                  addFontWeight('500'),
                  addColor(colors.gray.default, 'color'),
                ]}
                placeholderTextColor={colors.gray.default}
              />
              <View style={[addPadding('sm')]} />
              <Text
                style={[
                  addColor(colors.gray.default, 'color'),
                  addFontWeight('bold'),
                  addTextTransform('uppercase'),
                ]}>
                Codes ({formData.codes.length})
              </Text>
              <View style={[addPadding('sm')]} />
              {/* Codes */}
              <FlatList
                keyboardShouldPersistTaps="always"
                data={formData.codes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View
                    key={index}
                    style={[
                      addDirection('row'),
                      addAlignItems('center'),
                      addMargin('marginBottom', 'extra'),
                    ]}>
                    <Text
                      style={[
                        addColor(colors.gray.default, 'color'),
                        addFontWeight('bold'),
                        addTextTransform('uppercase'),
                      ]}>
                      {index + 1}.
                    </Text>
                    <View style={[addPadding('xs')]} />
                    <TextInput
                      style={[
                        addFlex(1),
                        addPadding('md'),
                        addColor(colors.white.default),
                        addColor(colors.gray.default, 'color'),
                        addBorderRadius('sm'),
                        addFontWeight('500'),
                      ]}
                      placeholderTextColor={colors.gray[700]}
                      placeholder="Code"
                      keyboardType="number-pad"
                      value={item}
                      maxLength={4}
                      onChangeText={value => handleCodeChange(index, value)}
                    />
                    <View style={[addPadding('xs')]} />
                    {index + 1 !== 1 && (
                      <View style={[addFlex(0.2)]}>
                        <IconButton
                          icon="delete-circle"
                          type="MaterialCommunity"
                          color={colors.red.default}
                          onPress={() => handleRemoveCode(index)}
                        />
                      </View>
                    )}
                    {formData.codes.length - 1 === index && (
                      <View style={[addFlex(0.2)]}>
                        <IconButton
                          icon="circle-plus"
                          type="FontAwesome6"
                          color={colors.green.default}
                          onPress={handleAddCode}
                        />
                      </View>
                    )}
                  </View>
                )}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={[addPadding('default')]}>
          <Button disabled={isValid()} title="CREATE" onPress={handleSubmit} />
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export interface FormData {
  name: string;
  id: string;
  codes: string[];
}
