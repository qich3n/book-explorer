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
 * Returns the appropriate gradient background classes with opacity for a given color
 */
export function getGradientBgWithOpacity(color: ColorVariant, opacity: string = '20'): string {
  const gradients: Record<ColorVariant, string> = {
    purple: `from-purple-500/${opacity} to-purple-600/${opacity}`,
    blue: `from-blue-500/${opacity} to-blue-600/${opacity}`,
    pink: `from-pink-500/${opacity} to-pink-600/${opacity}`,
    green: `from-green-500/${opacity} to-green-600/${opacity}`,
    red: `from-red-500/${opacity} to-red-600/${opacity}`,
    yellow: `from-yellow-500/${opacity} to-yellow-600/${opacity}`,
    gray: `from-gray-500/${opacity} to-gray-600/${opacity}`
  };
  
  return `bg-gradient-to-r ${gradients[color]}`;
}

/**
 * Returns the appropriate hover gradient background classes with opacity for a given color
 */
export function getHoverGradientBgWithOpacity(color: ColorVariant, opacity: string = '30'): string {
  const gradients: Record<ColorVariant, string> = {
    purple: `hover:from-purple-500/${opacity} hover:to-purple-600/${opacity}`,
    blue: `hover:from-blue-500/${opacity} hover:to-blue-600/${opacity}`,
    pink: `hover:from-pink-500/${opacity} hover:to-pink-600/${opacity}`,
    green: `hover:from-green-500/${opacity} hover:to-green-600/${opacity}`,
    red: `hover:from-red-500/${opacity} hover:to-red-600/${opacity}`,
    yellow: `hover:from-yellow-500/${opacity} hover:to-yellow-600/${opacity}`,
    gray: `hover:from-gray-500/${opacity} hover:to-gray-600/${opacity}`
  };
  
  return gradients[color];
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
