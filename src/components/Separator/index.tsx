import React from 'react';
import {Padding, Sizes, addPadding} from '../../theme';
import {View} from 'react-native';

export const Separator: React.FC<SeparatorProps> = React.memo(props => {
  const {elementSize = 'sm', type = 'padding', size} = props;
  return <View style={[addPadding(elementSize, type, size)]} />;
});

export interface SeparatorProps {
  elementSize?: Sizes;
  type?: Padding;
  size?: number;
}
