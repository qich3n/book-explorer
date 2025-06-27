'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Sparkles, BookOpen, Clock, TrendingUp } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const POPULAR_SEARCHES = [
  'Harry Potter',
  'Stephen King',
  'Science Fiction',
  'Mystery',
  'Romance',
  'Biography',
  'Fantasy',
  'Thriller',
];

const RECENT_SEARCHES_KEY = 'bookExplorer_recentSearches';

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading recent searches:', e);
      }
    }
  }, []);

  const saveRecentSearch = useCallback((searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    const updated = [
      trimmed,
      ...recentSearches.filter(s => s !== trimmed)
    ].slice(0, 5); // Keep only 5 recent searches

    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  }, [recentSearches]);

  // Debounced search function
  const debouncedSearch = useCallback((searchQuery: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (searchQuery.trim() && searchQuery.length >= 2) {
        setIsSearching(true);
        onSearch(searchQuery.trim());
        saveRecentSearch(searchQuery.trim());
        setTimeout(() => setIsSearching(false), 500);
      }
    }, 300); // 300ms debounce
  }, [onSearch, saveRecentSearch]);

  // Handle input changes with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Only trigger debounced search if we have enough characters
    if (value.length >= 2) {
      debouncedSearch(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const trimmedQuery = query.trim();
      setIsSearching(true);
      onSearch(trimmedQuery);
      saveRecentSearch(trimmedQuery);
      setShowSuggestions(false);
      inputRef.current?.blur();
      setTimeout(() => setIsSearching(false), 500);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsSearching(true);
    onSearch(suggestion);
    saveRecentSearch(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
    setTimeout(() => setIsSearching(false), 500);
  };

  const clearQuery = () => {
    setQuery('');
    setShowSuggestions(false);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    inputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  // Close suggestions when clicking outside or when overlays appear
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    // Hide suggestions when mobile menu button is clicked
    const handleMenuToggle = () => {
      setShowSuggestions(false);
      setIsFocused(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    // Listen for mobile menu button clicks
    const menuButtons = document.querySelectorAll('[aria-label="Toggle Menu"]');
    menuButtons.forEach(button => {
      button.addEventListener('click', handleMenuToggle);
    });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      menuButtons.forEach(button => {
        button.removeEventListener('click', handleMenuToggle);
      });
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const filteredPopularSearches = POPULAR_SEARCHES.filter(search =>
    search.toLowerCase().includes(query.toLowerCase()) && search !== query
  );

  return (
    <div className="relative w-full search-container z-50">
      <form onSubmit={handleSubmit} className="relative group">
        <div
          className={`
            relative flex items-center transition-all duration-500
            ${isFocused 
              ? 'transform scale-[1.02] drop-shadow-2xl' 
              : 'hover:scale-[1.01]'
            }
          `}
        >
          {/* Glow effect */}
          <div
            className={`
              absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 
              blur-xl transition-opacity duration-500
              ${isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
            `}
          />
          
          {/* Main search container */}
          <div className="relative w-full glass-effect rounded-2xl border border-white/20 overflow-hidden">
            {/* Search icon with loading state */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <div className="relative">
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
                ) : (
                  <Search 
                    className={`
                      w-5 h-5 transition-all duration-300
                      ${isFocused ? 'text-purple-400 scale-110' : 'text-gray-400'}
                    `} 
                  />
                )}
                {isFocused && !isSearching && (
                  <div className="absolute inset-0 animate-ping">
                    <Search className="w-5 h-5 text-purple-400 opacity-20" />
                  </div>
                )}
              </div>
            </div>

            {/* Input field */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => {
                setIsFocused(true);
                setShowSuggestions(true);
              }}
              onBlur={(e) => {
                // Only blur if not clicking on clear button or suggestions
                const relatedTarget = e.relatedTarget as HTMLElement;
                if (relatedTarget?.closest('.search-container')) {
                  return;
                }
                setIsFocused(false);
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              placeholder="Search for books, authors, or subjects..."
              className="w-full h-14 pl-12 pr-16 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg font-medium transition-all duration-300 relative z-10"
              minLength={1}
            />

            {/* Clear button */}
            {query && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  clearQuery();
                }}
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent input blur
                }}
                className="absolute right-16 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-full hover:scale-110 z-20"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Magic sparkle or search status */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              {isSearching ? (
                <TrendingUp className="w-5 h-5 text-green-400 animate-pulse" />
              ) : (
                <Sparkles 
                  className={`
                    w-5 h-5 transition-all duration-500
                    ${isFocused 
                      ? 'text-purple-400 animate-pulse-glow' 
                      : 'text-gray-500 group-hover:text-gray-400'
                    }
                  `} 
                />
              )}
            </div>

            {/* Animated border */}
            <div
              className={`
                absolute inset-0 rounded-2xl border-2 border-transparent
                bg-gradient-to-r from-purple-500 to-blue-500 p-[1px]
                transition-opacity duration-300
                ${isFocused ? 'opacity-100' : 'opacity-0'}
              `}
            >
              <div className="w-full h-full bg-transparent rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Search button with loading state */}
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="
            ml-4 px-8 py-3.5 rounded-2xl font-semibold text-white
            bg-gradient-to-r from-purple-500 to-blue-500
            hover:from-purple-600 hover:to-blue-600
            disabled:from-gray-600 disabled:to-gray-700
            transition-all duration-300 hover:scale-105 hover:shadow-neon
            disabled:cursor-not-allowed disabled:scale-100
            border border-purple-500/30 hover:border-purple-400/50
            backdrop-blur-sm relative overflow-hidden group
          "
        >
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          
          {/* Button shimmer effect */}
          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          
          <span className="relative z-10 flex items-center gap-2">
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Searching...
              </>
            ) : (
              'Search'
            )}
          </span>
        </button>
      </form>

      {/* Enhanced suggestions dropdown */}
      {showSuggestions && (isFocused || query) && (
        <div
          ref={suggestionsRef}
          className="
            absolute top-full left-0 right-0 mt-2 z-30
            bg-gray-900/85 dark:bg-gray-900/85 light:bg-white/90
            backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/20 light:border-gray-200
            shadow-glass-lg animate-slide-up
          "
        >
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Recent searches
                  </h4>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-1">
                  {recentSearches.slice(0, 3).map((search, index) => (
                    <button
                      key={index}
                      onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 hover:translate-x-1 border border-transparent hover:border-white/10 group"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                        <span className="flex-1">{search}</span>
                        <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          Search again
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filtered popular searches or all popular searches */}
            {(query ? filteredPopularSearches : POPULAR_SEARCHES).length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {query ? 'Suggestions' : 'Popular searches'}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {(query ? filteredPopularSearches : POPULAR_SEARCHES).slice(0, 6).map((search, index) => (
                    <button
                      key={index}
                      onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                      onClick={() => handleSuggestionClick(search)}
                      className="text-left px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 border border-purple-500/20 hover:border-purple-400/30 transition-all duration-300 hover:scale-[1.02] group"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                        <span className="truncate">{search}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced no suggestions state */}
            {query && filteredPopularSearches.length === 0 && recentSearches.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-3 opacity-50" />
                <p className="text-gray-400 text-sm mb-2">
                  Press Enter to search for &quot;{query}&quot;
                </p>
                {query.length < 2 && (
                  <p className="text-gray-500 text-xs">
                    Try typing at least 2 characters for better suggestions
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Enhanced bottom tip */}
          <div className="px-4 py-3 border-t border-white/5 bg-white/5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">
                💡 Tip: Search automatically as you type
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">ESC</kbd>
                <span>to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}