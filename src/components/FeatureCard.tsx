import { LucideIcon } from 'lucide-react';
import { ColorVariant, getGradientBgClasses } from '@/lib/utils/colorUtils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: ColorVariant;
  animationDelay?: string;
}

/**
 * Reusable feature card component for displaying features, stats, or info cards
 */
export default function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color = 'purple',
  animationDelay = '0s'
}: FeatureCardProps) {
  const gradientClasses = getGradientBgClasses(color);
  
  return (
    <div
      className="glass-effect rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group animate-slide-up"
      style={{ animationDelay }}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${gradientClasses}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
