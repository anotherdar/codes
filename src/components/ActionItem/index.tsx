import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {
  addColor,
  addPadding,
  colors,
  addDirection,
  addRadius,
  sizes,
  addAlignItems,
  addFontWeight,
  fontSize,
  addTextTransform,
} from '../../theme';
import {IconBuilder, IconBuilderProps} from '../IconBuilder';

export const ActionItem: React.FC<ActionItemProps> = props => {
  const {icon, label, onPress} = props;
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => {
        return {
          ...addColor(colors.white.default),
          ...addDirection('row'),
          ...addRadius('borderRadius', 'sm'),
          ...addAlignItems('center'),
          opacity: pressed ? 0.8 : 1,
        };
      }}>
      <View
        style={[
          addPadding('default'),
          addColor(colors.yellow.default),
          addRadius('borderBottomRightRadius', '1xl'),
          addRadius('borderTopRightRadius', '1xl'),
          addRadius('borderTopLeftRadius', 'sm'),
          addRadius('borderBottomLeftRadius', 'sm'),
        ]}>
        <IconBuilder
          {...icon}
          icon="file-circle-plus"
          type="FontAwesome6"
          color={icon.color || colors.white.default}
          size={icon.size || sizes.xl}
        />
      </View>
      <View style={addPadding('sm', 'paddingHorizontal')} />
      <View>
        <Text
          style={[
            addFontWeight('bold'),
            fontSize('normal'),
            addColor(colors.gray.default, 'color'),
            addTextTransform('uppercase'),
          ]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export interface ActionItemProps {
  label: string;
  icon: IconBuilderProps;
  onPress: () => void;
}
