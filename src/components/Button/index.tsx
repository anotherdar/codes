import React from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {
  addBorderRadius,
  addColor,
  addFontWeight,
  addPadding,
  addWidth,
  colors,
  fontSize,
  addAlignItems,
  addJustifyContent,
  addDirection,
} from '../../theme';
import {IconBuilder} from '../IconBuilder';

export const Button: React.FC<ButtonProps> = props => {
  const {
    title,
    color = colors.gray.default,
    background = colors.yellow.default,
    isLoading,
    left,
    right,
  } = props;

  function renderLeft() {
    if (typeof left === 'function') {
      return left();
    }

    if (typeof left === 'string') {
      return (
        <IconBuilder icon={left} size={24} color={color} type="FontAwesome6" />
      );
    }

    return null;
  }

  function rendeRight() {
    if (typeof right === 'function') {
      return right();
    }

    if (typeof right === 'string') {
      return (
        <IconBuilder icon={right} size={24} color={color} type="FontAwesome6" />
      );
    }

    return null;
  }

  return (
    <Pressable
      onPress={props.onPress}
      style={({pressed}) => {
        return {
          ...addWidth('100%'),
          ...addColor(background, 'backgroundColor'),
          ...addPadding('default', 'paddingHorizontal'),
          ...addPadding('md', 'paddingVertical'),
          ...addBorderRadius('xs'),
          ...addDirection('row'),
          ...addJustifyContent('center'),
          ...addAlignItems('center'),
          opacity: pressed ? 0.8 : 1,
        };
      }}>
      {isLoading && <ActivityIndicator size={24} color={color} />}
      {!isLoading && renderLeft()}
      <View style={addPadding('sm')} />
      <Text
        style={[
          addColor(color, 'color'),
          fontSize('default'),
          addFontWeight('bold'),
        ]}>
        {title}
      </Text>
      <View style={addPadding('sm')} />
      {rendeRight()}
    </Pressable>
  );
};

export interface ButtonProps {
  title: string;
  background?: string;
  color?: string;
  isLoading?: boolean;
  onPress: () => void;
  left?: () => JSX.Element | string;
  right?: () => JSX.Element | string;
}
