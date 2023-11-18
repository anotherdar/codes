import React, {FC, PropsWithChildren} from 'react';
import {Modal, Pressable, View, Text} from 'react-native';
import {
  addAlignItems,
  addColor,
  addDirection,
  addFlex,
  addFontWeight,
  addJustifyContent,
  addPadding,
  addRadius,
  addTextTransform,
  colors,
} from '../../theme';

export const BottomSheet: FC<PropsWithChildren<BottomSheetProps>> = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onDismiss}>
      <Pressable
        onPress={props.onDismiss}
        style={[
          addColor('rgba(0,0,0,.5)'),
          addFlex(1),
          addJustifyContent('flex-end'),
        ]}>
        <Pressable onPress={e => e.stopPropagation()}>
          {/* Header  */}
          <View
            style={[
              addColor(colors.white.default),
              addDirection('row'),
              addAlignItems('center'),
              addJustifyContent('center'),
              addPadding('default', 'paddingHorizontal'),
              addPadding('md', 'paddingVertical'),
              addRadius('borderTopLeftRadius', 'md'),
              addRadius('borderTopRightRadius', 'md'),
            ]}>
            <Text
              style={[
                addFontWeight('bold'),
                addColor(colors.gray.default, 'color'),
                addTextTransform('uppercase'),
              ]}>
              {props.title}
            </Text>
          </View>
          {/*  */}
          <View
            style={[
              addColor(colors.white[500]),
              addPadding('default', 'paddingHorizontal'),
              addPadding('extra', 'paddingVertical'),
            ]}>
            {props.children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export interface BottomSheetProps {
  title: string;
  icon?: string | React.ReactNode;
  onDismiss: () => void;
  visible: boolean;
}
