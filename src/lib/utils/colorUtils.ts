/**
 * Utility functions for consistent color handling across the application
 */

export type ColorVariant = 'purple' | 'blue' | 'pink' | 'green' | 'red' | 'yellow' | 'gray';

/**
 * Returns the appropriate gradient background classes for a given color
 */
export function getGradientBgClasses(color: ColorVariant): string {
  const gradients: Record<ColorVariant, string> = {
    purple: 'from-purple-500 to-purple-600',
    blue: 'from-blue-500 to-blue-600',
    pink: 'from-pink-500 to-pink-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600',
    gray: 'from-gray-500 to-gray-600'
  };
  
  return `bg-gradient-to-r ${gradients[color]}`;
}

/**
 * Helper function to generate gradient classes with opacity
 */
function generateGradientWithOpacity(color: ColorVariant, opacity: number, prefix: string = ''): string {
  const gradients: Record<ColorVariant, string> = {
    purple: `${prefix}from-purple-500/${opacity} ${prefix}to-purple-600/${opacity}`,
    blue: `${prefix}from-blue-500/${opacity} ${prefix}to-blue-600/${opacity}`,
    pink: `${prefix}from-pink-500/${opacity} ${prefix}to-pink-600/${opacity}`,
    green: `${prefix}from-green-500/${opacity} ${prefix}to-green-600/${opacity}`,
    red: `${prefix}from-red-500/${opacity} ${prefix}to-red-600/${opacity}`,
    yellow: `${prefix}from-yellow-500/${opacity} ${prefix}to-yellow-600/${opacity}`,
    gray: `${prefix}from-gray-500/${opacity} ${prefix}to-gray-600/${opacity}`
  };
  
  return gradients[color];
}

/**
 * Returns the appropriate gradient background classes with opacity for a given color
 */
export function getGradientBgWithOpacity(color: ColorVariant, opacity: number = 20): string {
  return `bg-gradient-to-r ${generateGradientWithOpacity(color, opacity)}`;
}

/**
 * Returns the appropriate hover gradient background classes with opacity for a given color
 */
export function getHoverGradientBgWithOpacity(color: ColorVariant, opacity: number = 30): string {
  return generateGradientWithOpacity(color, opacity, 'hover:');
}

/**
 * Returns the appropriate text color class for a given color
 */
export function getTextColor(color: ColorVariant): string {
  const colors: Record<ColorVariant, string> = {
    purple: 'text-purple-400',
    blue: 'text-blue-400',
    pink: 'text-pink-400',
    green: 'text-green-400',
    red: 'text-red-400',
    yellow: 'text-yellow-400',
    gray: 'text-gray-400'
  };
  
  return colors[color];
}
