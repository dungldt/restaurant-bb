import React from 'react';
import {
  Star,
  Flame,
  Sparkles,
  Crown,
  Award,
  Zap,
  Heart,
  Trophy,
  type LucideIcon
} from 'lucide-react';

// Icon mapping for featured badges
const ICON_MAP: Record<string, LucideIcon> = {
  // Main icons
  'star': Star,
  'flame': Flame,
  'fire': Flame, // Alias for flame
  'sparkles': Sparkles,
  'stars-02': Sparkles, // Legacy alias
  
  // Additional dynamic icons
  'crown': Crown,
  'award': Award,
  'zap': Zap,
  'heart': Heart,
  'trophy': Trophy,
};

export interface IconProps {
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  size?: number;
}

/**
 * Get a Lucide icon component by name
 */
export const getIconByName = (iconName: string): LucideIcon => {
  return ICON_MAP[iconName.toLowerCase()] || Sparkles; // Default to Sparkles
};

/**
 * Render an icon component with props
 */
export const renderIcon = (
  iconName: string, 
  props: IconProps = {}
): React.ReactElement => {
  const IconComponent = getIconByName(iconName);
  return <IconComponent {...props} />;
};

/**
 * Get all available icon names
 */
export const getAvailableIcons = (): string[] => {
  return Object.keys(ICON_MAP);
};

/**
 * Check if an icon name is valid
 */
export const isValidIcon = (iconName: string): boolean => {
  return iconName.toLowerCase() in ICON_MAP;
};
