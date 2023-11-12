import React from 'react';
import {TextStyle} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export const IconBuilder: React.FC<IconBuilderProps> = props => {
  const {icon, size, color, style, type} = props;

  function render() {
    switch (type) {
      case 'FontAwesome':
        return (
          <FontAwesome style={[style]} name={icon} size={size} color={color} />
        );
      case 'FontAwesome6':
        return (
          <FontAwesome6 style={[style]} name={icon} size={size} color={color} />
        );
      case 'MaterialCommunity':
        return (
          <MaterialCommunityIcons
            style={[style]}
            name={icon}
            size={size}
            color={color}
          />
        );
      default:
        return (
          <FontAwesome style={[style]} name={icon} size={size} color={color} />
        );
    }
  }

  return render();
};

export interface IconBuilderProps {
  icon: string;
  size?: number;
  color?: string;
  style?: TextStyle;
  type?: 'FontAwesome' | 'MaterialCommunity' | 'FontAwesome6';
}
