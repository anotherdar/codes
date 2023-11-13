import React from 'react';
import {Pressable, View} from 'react-native';
import {IconBuilder, IconBuilderProps} from '../IconBuilder';
import {addOpacity, addPosition, colors, sizes} from '../../theme';
import {
  createCircle,
  addColor,
  addJustifyContent,
  addAlignItems,
} from '../../theme/index';

export const IconButton: React.FC<IconButtonProps> = props => {
  const {onPress, hideBackground, ...icon} = props;
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => {
        return {
          opacity: pressed ? 0.8 : 1,
          ...addJustifyContent('center'),
          ...addAlignItems('center'),
        };
      }}>
      {!hideBackground && (
        <View
          style={[
            /**
             * size * 1.5 to increase the size just a bit
             * in order to create a padding effect.
             */
            createCircle((icon.size || sizes.default) * 1.5),
            addColor(icon.color || colors.gray.default, 'backgroundColor'),
            addOpacity(0.2),
            addPosition('absolute'),
          ]}
        />
      )}
      <IconBuilder
        {...icon}
        size={icon.size || sizes.default}
        color={icon.color || colors.gray.default}
      />
    </Pressable>
  );
};

export interface IconButtonProps extends IconBuilderProps {
  onPress: () => void;
  hideBackground?: boolean;
}
