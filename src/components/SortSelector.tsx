'use client';

import { useState } from 'react';
import { ChevronDown, Filter, Calendar, SortAsc, Sparkles } from 'lucide-react';

interface SortSelectorProps {
  onSort: (option: string) => void;
}

export default function SortSelector({ onSort }: SortSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('relevance');

  const sortOptions = [
    {
      value: 'relevance',
      label: 'Relevance',
      description: 'Best matches first',
      icon: Sparkles,
      color: 'purple'
    },
    {
      value: 'new',
      label: 'Newest First',
      description: 'Recently published',
      icon: Calendar,
      color: 'blue'
    },
    {
      value: 'old',
      label: 'Oldest First',
      description: 'Classic literature',
      icon: Calendar,
      color: 'green'
    },
    {
      value: 'title',
      label: 'Title A-Z',
      description: 'Alphabetical order',
      icon: SortAsc,
      color: 'pink'
    }
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onSort(option);
    setIsOpen(false);
  };

  const selectedSortOption = sortOptions.find(opt => opt.value === selectedOption);

  return (
    <div className="relative">
      {/* Label */}
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-4 h-4 text-purple-400" />
        <label className="text-gray-300 font-medium text-sm">
          Sort by:
        </label>
      </div>

      {/* Custom Select Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          relative w-full min-w-48 glass-effect rounded-xl border border-white/10
          hover:border-white/20 transition-all duration-300 hover:scale-[1.02]
          p-3 text-left group
        "
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedSortOption && (
              <div className={`
                p-1.5 rounded-lg bg-gradient-to-r 
                ${selectedSortOption.color === 'purple' ? 'from-purple-500/20 to-purple-600/20' :
                  selectedSortOption.color === 'blue' ? 'from-blue-500/20 to-blue-600/20' :
                  selectedSortOption.color === 'green' ? 'from-green-500/20 to-green-600/20' :
                  'from-pink-500/20 to-pink-600/20'}
                border border-white/10
              `}>
                <selectedSortOption.icon className={`
                  w-4 h-4
                  ${selectedSortOption.color === 'purple' ? 'text-purple-400' :
                    selectedSortOption.color === 'blue' ? 'text-blue-400' :
                    selectedSortOption.color === 'green' ? 'text-green-400' :
                    'text-pink-400'}
                `} />
              </div>
            )}
            <div>
              <div className="text-white font-medium text-sm">
                {selectedSortOption?.label}
              </div>
              <div className="text-gray-400 text-xs">
                {selectedSortOption?.description}
              </div>
            </div>
          </div>
          
          <ChevronDown 
            className={`
              w-5 h-5 text-gray-400 group-hover:text-white 
              transition-all duration-300
              ${isOpen ? 'rotate-180' : 'rotate-0'}
            `} 
          />
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="
            absolute top-full left-0 right-0 mt-2 z-20
            glass-effect rounded-xl border border-white/10 shadow-glass-lg
            backdrop-blur-xl animate-slide-up overflow-hidden
          ">
            <div className="p-2">
              {sortOptions.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`
                    w-full text-left p-3 rounded-lg transition-all duration-300
                    hover:bg-white/10 hover:scale-[1.02] group
                    ${selectedOption === option.value 
                      ? 'bg-white/5 border border-white/10' 
                      : 'border border-transparent hover:border-white/10'
                    }
                  `}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      p-2 rounded-lg bg-gradient-to-r transition-all duration-300
                      ${option.color === 'purple' ? 'from-purple-500/20 to-purple-600/20 group-hover:from-purple-500/30 group-hover:to-purple-600/30' :
                        option.color === 'blue' ? 'from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/30 group-hover:to-blue-600/30' :
                        option.color === 'green' ? 'from-green-500/20 to-green-600/20 group-hover:from-green-500/30 group-hover:to-green-600/30' :
                        'from-pink-500/20 to-pink-600/20 group-hover:from-pink-500/30 group-hover:to-pink-600/30'}
                      border border-white/10
                    `}>
                      <option.icon className={`
                        w-4 h-4 transition-all duration-300
                        ${option.color === 'purple' ? 'text-purple-400' :
                          option.color === 'blue' ? 'text-blue-400' :
                          option.color === 'green' ? 'text-green-400' :
                          'text-pink-400'}
                        group-hover:scale-110
                      `} />
                    </div>
                    
                    <div className="flex-1">
                      <div className={`
                        font-medium text-sm transition-colors duration-300
                        ${selectedOption === option.value 
                          ? 'text-white' 
                          : 'text-gray-300 group-hover:text-white'
                        }
                      `}>
                        {option.label}
                      </div>
                      <div className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
                        {option.description}
                      </div>
                    </div>

                    {selectedOption === option.value && (
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom tip */}
            <div className="px-4 py-3 border-t border-white/5 bg-white/5">
              <p className="text-xs text-gray-400 text-center">
                💡 Sort options help you find exactly what you&apos;re looking for
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}