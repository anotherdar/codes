import {
  DimensionValue,
  FlexStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

/**
 * Color options that the theme support
 */
type Color = 'backgroundColor' | 'color' | 'borderColor';
/**
 * Padding options that the theme support
 */
export type Padding =
  | 'padding'
  | 'paddingHorizontal'
  | 'paddingBottom'
  | 'paddingTop'
  | 'paddingVertical'
  | 'paddingLeft'
  | 'paddingRight';
/**
 * Sizes options that the theme support
 */
export type Sizes =
  | 'xs'
  | 'sm'
  | 'md'
  | 'normal'
  | 'extra'
  | 'default'
  | 'xl'
  | '1xl'
  | '2xl';

export type RadiusTypes =
  | 'borderRadius'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius';

export type MarginTypes =
  | 'margin'
  | 'marginBottom'
  | 'marginEnd'
  | 'marginHorizontal'
  | 'marginLeft'
  | 'marginRight'
  | 'marginStart'
  | 'marginTop'
  | 'marginVertical';

/**
 * Sizes for the theme
 */
export const sizes = {
  xs: 4,
  sm: 8,
  md: 12,
  normal: 16,
  extra: 18,
  default: 24,
  xl: 32,
  '1xl': 44,
  '2xl': 48,
  '3xl': 54,
};

/**
 * Theme color
 */
export const colors = {
  yellow: {
    default: '#ffaa00',
    700: '#bb5902',
    900: '#481c00',
  },
  gray: {
    default: '#121212',
    900: '#3d3d3d',
    700: '#4f4f4f',
  },
  white: {
    default: '#ffffff',
    500: '#f2f2f2',
  },
  red: {
    default: '#ff2a00',
    500: '#ff450a',
  },
  green: {
    default: '#00C784',
    600: '#00a46d',
  },
};
// add color
export function addColor(color: string, type: Color = 'backgroundColor') {
  return {
    [type]: color,
  };
}

/**
 * Create Circle - small function to create a perfect circle
 * @param number size
 */
export function createCircle(size: number) {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
}

/**
 * Small function to add padding to a component or element
 * @param size one of {Sizes}
 * @param type one of {Padding}
 * @param size manual option to add padding
 */
export function addPadding(
  elementSize: Sizes,
  type: Padding = 'padding',
  size?: number,
) {
  return {
    [type]: size || sizes[elementSize],
  };
}

/**
 * Util to add border radius to an element
 * @param size
 */
export function addBorderRadius(type: Sizes, size?: number) {
  return {
    borderRadius: size || sizes[type],
  };
}

export function addWidth(width: DimensionValue) {
  return {
    width,
  };
}

/**
 * Styles for flex orientation
 */
export const orientation = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  spread: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  evenly: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  allCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignTop: {
    alignItems: 'flex-start',
  },
  self: {
    alignSelf: 'flex-start',
  },
  endRow: {
    justifyContent: 'flex-end',
  },
  full: {
    flex: 1,
  },
  disableGrow: {
    flexGrow: 0,
  },
});

/**
 * Util to add a font size
 * @param type one of {Sizes}
 * @param size manual size
 */
export function fontSize(type: Sizes, size?: number) {
  return {
    fontSize: size || sizes[type],
  };
}

/**
 * utils to add font weight
 * @param fontWeight
 */
export function addFontWeight(fontWeight: TextStyle['fontWeight']) {
  return {
    fontWeight,
  };
}

export function addDirection(flexDirection: FlexStyle['flexDirection']) {
  return {
    flexDirection,
  };
}

export function addJustifyContent(justifyContent: FlexStyle['justifyContent']) {
  return {
    justifyContent,
  };
}

export function addAlignItems(alignItems: FlexStyle['alignItems']) {
  return {
    alignItems,
  };
}

export function addFlex(flex: FlexStyle['flex']) {
  return {
    flex,
  };
}

export function addTextAlign(textAlign: TextStyle['textAlign']) {
  return {
    textAlign,
  };
}

export function addOpacity(opacity: ViewStyle['opacity']) {
  return {
    opacity,
  };
}

export function addPosition(position: FlexStyle['position']) {
  return {
    position,
  };
}

export function addTextTransform(textTransform: TextStyle['textTransform']) {
  return {
    textTransform,
  };
}

export function addRadius(type: RadiusTypes, radius: Sizes, size?: number) {
  return {
    [type]: size || sizes[radius],
  };
}

export function wrapText(
  flexWrap: FlexStyle['flexWrap'] = 'wrap',
  flexShrink: FlexStyle['flexShrink'] = 1,
) {
  return {
    ...addFlex(1),
    flexWrap,
    flexShrink,
  };
}

export function addMargin(type: MarginTypes, margin: Sizes, size?: number) {
  return {
    [type]: sizes[margin] || size,
  };
}

export function addBorder(size: number) {
  return StyleSheet.create({
    sm: {
      borderWidth: size,
    },
  }).sm;
}
