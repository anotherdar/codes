type Color = 'backgroundColor' | 'color';

// sizes for all the app
export const sizes = {
  xs: 4,
  sm: 8,
  md: 12,
  normal: 16,
  default: 24,
  xl: 32,
  '1xl': 44,
  '2xl': 48,
};
// color theme
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
 * @param size
 * @returns
 */
export function createCircle(size: number) {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
}
