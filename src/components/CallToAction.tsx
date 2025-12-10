import Link from 'next/link';

interface CallToActionProps {
  title: string;
  description: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}

/**
 * Reusable call-to-action section component
 * Consistent styling for CTA sections across pages
 */
export default function CallToAction({ 
  title, 
  description, 
  primaryButton, 
  secondaryButton 
}: CallToActionProps) {
  return (
    <section className="text-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
      <div className="glass-effect rounded-3xl p-12 backdrop-blur-xl border border-white/10 shadow-glass-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{title}</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        
        {(primaryButton || secondaryButton) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryButton && (
              <Link
                href={primaryButton.href}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-neon border border-purple-500/30"
              >
                {primaryButton.text}
              </Link>
            )}
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className="px-8 py-4 glass-effect text-white rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
