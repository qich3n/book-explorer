import { BookOpen, Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'default' | 'books' | 'search';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...', 
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (variant === 'books') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="relative mb-6">
          {/* Floating books animation */}
          <div className="relative">
            <BookOpen 
              className="w-12 h-12 text-purple-400 animate-bounce" 
              style={{ animationDelay: '0s' }}
            />
            <BookOpen 
              className="absolute -top-2 -right-2 w-8 h-8 text-blue-400 animate-bounce" 
              style={{ animationDelay: '0.2s' }}
            />
            <BookOpen 
              className="absolute -bottom-2 -left-2 w-6 h-6 text-pink-400 animate-bounce" 
              style={{ animationDelay: '0.4s' }}
            />
          </div>
          
          {/* Orbiting sparkles */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
            <Sparkles className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute top-1/2 -right-4 -translate-y-1/2 w-3 h-3 text-green-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 text-blue-400 animate-pulse" style={{ animationDelay: '1s' }} />
            <Sparkles className="absolute top-1/2 -left-4 -translate-y-1/2 w-3 h-3 text-purple-400 animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
        
        <div className="text-center">
          <p className={`text-white font-medium ${textSizeClasses[size]} mb-2`}>
            {text}
          </p>
          <p className="text-gray-400 text-sm">
            Discovering amazing books for you...
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'search') {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="relative mb-4">
          {/* Pulsing search ring */}
          <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Main spinner */}
          <div className={`${sizeClasses[size]} border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin`}></div>
          
          {/* Inner glow */}
          <div className="absolute inset-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-sm"></div>
        </div>
        
        <p className={`text-gray-300 font-medium ${textSizeClasses[size]}`}>
          {text}
        </p>
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative mb-4">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-purple-500/20 rounded-full absolute animate-pulse`}></div>
        
        {/* Main spinner */}
        <div className={`${sizeClasses[size]} border-4 border-transparent border-t-purple-500 border-r-blue-500 rounded-full animate-spin`}></div>
        
        {/* Inner dot */}
        <div className="absolute inset-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-lg animate-pulse"></div>
      </div>
      
      {text && (
        <p className={`text-gray-300 font-medium ${textSizeClasses[size]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;