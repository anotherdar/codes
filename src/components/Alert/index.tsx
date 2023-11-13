import React from 'react';
import {View, Text} from 'react-native';
import {
  addPadding,
  addColor,
  colors,
  addRadius,
  addDirection,
  wrapText,
  addAlignItems,
  sizes,
  addFontWeight,
} from '../../theme';
import {IconBuilder, IconBuilderProps} from '../IconBuilder';

export const AlertMessage: React.FC<AlertMessageProps> = props => {
  const {message, icon, background, color} = props;
  return (
    <View
      style={[
        addPadding('normal'),
        addColor(background || colors.white.default),
        addRadius('borderRadius', 'sm'),
        addDirection('row'),
        addAlignItems('center'),
      ]}>
      <IconBuilder
        {...icon}
        size={icon.size || sizes.default}
        color={icon.color || colors.gray.default}
      />
      <View style={addPadding('sm', 'paddingRight')} />

      <Text
        style={[
          addFontWeight('bold'),
          wrapText(),
          addColor(color || colors.gray.default, 'color'),
        ]}>
        {message}
      </Text>
    </View>
  );
};

export interface AlertMessageProps {
  message: string;
  icon: IconBuilderProps;
  background?: string;
  color?: string;
}
