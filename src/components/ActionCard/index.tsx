import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {IconBuilder, IconBuilderProps} from '../IconBuilder';
import {
  addColor,
  addPadding,
  colors,
  addJustifyContent,
  addAlignItems,
  addFontWeight,
  fontSize,
  addWidth,
  addTextAlign,
  addBorderRadius,
  sizes,
  addTextTransform,
} from '../../theme';

export const ActionCard: React.FC<ActionCardProps> = props => {
  const {title, desc, onPress, background, textColor, ...icon} = props;
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => {
        return {
          ...addJustifyContent('center'),
          ...addAlignItems('center'),
          ...addColor(background || colors.white.default),
          ...addPadding('default'),
          ...addBorderRadius('md'),
          opacity: pressed ? 0.8 : 1,
        };
      }}>
      <IconBuilder {...icon} size={icon.size || sizes['2xl'] * 2} />
      <View
        style={[
          addPadding('sm'),
          addJustifyContent('center'),
          addAlignItems('center'),
        ]}>
        <Text
          style={[
            addFontWeight('bold'),
            fontSize('extra'),
            addColor(textColor || colors.gray.default, 'color'),
            addTextTransform('uppercase'),
          ]}>
          {title}
        </Text>
        {desc && (
          <View style={[addWidth('65%')]}>
            <Text
              style={[
                addTextAlign('center'),
                addColor(textColor || colors.gray[900], 'color'),
              ]}>
              {desc}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export interface ActionCardProps extends IconBuilderProps {
  title: string;
  desc?: string;
  onPress: () => void;
  background?: string;
  textColor?: string;
}
