import { Sparkles, LucideIcon } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  description?: string;
  icon?: LucideIcon;
}

/**
 * Reusable hero section component for page headers
 * Provides consistent styling across all pages
 */
export default function PageHero({ title, subtitle, description, icon: Icon }: PageHeroProps) {
  return (
    <section className="relative text-center mb-20 pt-8">
      <div className="animate-slide-up">
        <div className="flex items-center justify-center mb-8">
          {Icon ? (
            <Icon className="w-8 h-8 text-purple-400 mr-3 animate-pulse-glow" />
          ) : (
            <Sparkles className="w-8 h-8 text-purple-400 mr-3 animate-pulse-glow" />
          )}
          <h1 className="text-6xl md:text-7xl font-black gradient-text tracking-tight">
            {title}
          </h1>
          <Sparkles className="w-8 h-8 text-blue-400 ml-3 animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        {description && (
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
