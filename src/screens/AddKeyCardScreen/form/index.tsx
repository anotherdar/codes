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
import {useNavigator} from '../../../hooks';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const AddKeyCardFormScreen = () => {
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

  const handleSubmit = () => {
    // Implement your form submission logic here
    console.log(formData);
  };

  function navigateBack(): void {
    navigator.goBack(['home']);
  }

  function gotoSettings() {
    navigator.navigate('settings');
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
                Codes
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
                    <TextInput
                      style={[
                        addFlex(1),
                        addPadding('md'),
                        addColor(colors.white.default),
                        addBorderRadius('sm'),
                        addFontWeight('500'),
                      ]}
                      placeholderTextColor={colors.gray[700]}
                      placeholder="Code"
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
          <Button title="CREATE" onPress={handleSubmit} />
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
