import React from 'react';
import {View, Text} from 'react-native';
import {
  addAlignItems,
  addColor,
  addDirection,
  addFlex,
  addFontWeight,
  addJustifyContent,
  addPadding,
  addTextAlign,
  addTextTransform,
  colors,
  fontSize,
} from '../../theme';
import {IconBuilderProps} from '../IconBuilder';
import {renderAction} from '../../utils';

export const AppHeader: React.FC<AppHeaderProps> = props => {
  const {name, left, leftAction, right, rightAction} = props;

  return (
    <View
      style={[
        addDirection('row'),
        addAlignItems('center'),
        addJustifyContent('space-between'),
      ]}>
      {/* Left icon */}
      <View style={[addPadding('xs', 'paddingHorizontal'), addFlex(0.1)]}>
        {renderAction(left, leftAction)}
      </View>
      {/* header */}
      <View style={[addFlex(1)]}>
        {name && (
          <Text
            style={[
              addFontWeight('bold'),
              fontSize('extra'),
              addColor(colors.gray.default, 'color'),
              addTextAlign('center'),
              addTextTransform('uppercase'),
            ]}>
            {name}
          </Text>
        )}
      </View>
      {/* right action */}
      <View style={[addPadding('xs', 'paddingHorizontal'), addFlex(0.1)]}>
        {renderAction(right, rightAction)}
      </View>
    </View>
  );
};

export interface AppHeaderProps {
  name?: string;
  left?: (() => JSX.Element) | IconBuilderProps;
  leftAction?: () => void;
  right?: (() => JSX.Element) | IconBuilderProps;
  rightAction?: () => void;
}
