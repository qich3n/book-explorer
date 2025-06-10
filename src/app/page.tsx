'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import BookList from '@/components/BookList';
import SortSelector from '@/components/SortSelector';
import { Sparkles, BookOpen, Search } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('relevance');

  // Check for search parameter in URL on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const searchParam = urlParams.get('search');
      if (searchParam) {
        setSearchQuery(searchParam);
        // Clean up URL without refreshing page
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);

  return (
    <main className="relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative text-center mb-16 pt-8">
        <div className="animate-slide-up">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-purple-400 mr-3 animate-pulse-glow" />
            <h1 className="text-7xl md:text-8xl font-black gradient-text tracking-tight">
              Book Explorer
            </h1>
            <Sparkles className="w-8 h-8 text-blue-400 ml-3 animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <div className="relative">
            <p className="text-xl md:text-2xl text-theme-secondary mb-4 font-light tracking-wide">
              Discover your next favorite book
            </p>
            <p className="text-lg text-theme-tertiary max-w-2xl mx-auto leading-relaxed">
              Explore millions of books with our intelligent search. Find hidden gems, 
              bestsellers, and everything in between.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 animate-bounce-subtle">
          <BookOpen className="w-6 h-6 text-purple-400/30" />
        </div>
        <div className="absolute top-20 right-20 animate-bounce-subtle" style={{ animationDelay: '1s' }}>
          <Search className="w-5 h-5 text-blue-400/30" />
        </div>
      </section>

      {/* Search & Sort Section */}
      <section className="relative mb-12 animate-slide-up z-10" style={{ animationDelay: '0.2s' }}>
        <div className="bg-white/5 dark:bg-white/5 light:bg-black/5 rounded-3xl p-8 backdrop-blur-lg border border-white/5 dark:border-white/5 light:border-black/5 shadow-glass hover:shadow-glass-lg transition-all duration-500 hover:scale-[1.02]">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-6">
            <div className="w-full lg:w-3/4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-50"></div>
                <div className="relative">
                  <SearchBar onSearch={setSearchQuery} />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-auto flex justify-end">
              <div className="bg-white/5 dark:bg-white/5 light:bg-black/5 rounded-2xl p-2 border border-white/5 dark:border-white/5 light:border-black/5">
                <SortSelector onSort={setSortOption} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book List Section */}
      <section className="relative animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="bg-white/5 dark:bg-white/5 light:bg-black/5 rounded-3xl p-8 backdrop-blur-lg border border-white/5 dark:border-white/5 light:border-black/5 shadow-glass min-h-[600px]">
          <BookList searchQuery={searchQuery} sortOption={sortOption} />
        </div>
      </section>

      {/* Welcome Message for Empty Search */}
      {!searchQuery && (
        <section className="relative text-center mt-16 animate-fade-in z-10" style={{ animationDelay: '0.6s' }}>
          <div className="bg-white/5 dark:bg-white/5 light:bg-black/5 rounded-3xl p-12 backdrop-blur-lg border border-white/5 dark:border-white/5 light:border-black/5 shadow-glass max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
                Ready to explore?
              </h2>
              <p className="text-lg md:text-xl text-theme-secondary mb-6 max-w-2xl mx-auto leading-relaxed">
                Enter a search term above to discover amazing books. Try searching by:
              </p>
            </div>
            
            {/* Search suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/5 dark:bg-white/5 light:bg-black/5 rounded-2xl p-6 border border-white/5 dark:border-white/5 light:border-black/5 hover:border-purple-500/30 transition-all duration-300 hover:scale-105 group">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-theme-primary mb-2">Book Titles</h3>
                <p className="text-theme-tertiary text-sm">Search for specific books like &quot;The Great Gatsby&quot;</p>
              </div>
              
              <div className="bg-white/5 dark:bg-white/5 light:bg-black/5 rounded-2xl p-6 border border-white/5 dark:border-white/5 light:border-black/5 hover:border-blue-500/30 transition-all duration-300 hover:scale-105 group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-theme-primary mb-2">Authors</h3>
                <p className="text-theme-tertiary text-sm">Find works by your favorite authors</p>
              </div>
              
              <div className="bg-white/5 dark:bg-white/5 light:bg-black/5 rounded-2xl p-6 border border-white/5 dark:border-white/5 light:border-black/5 hover:border-pink-500/30 transition-all duration-300 hover:scale-105 group">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-theme-primary mb-2">Subjects</h3>
                <p className="text-theme-tertiary text-sm">Explore topics like &quot;science fiction&quot; or &quot;history&quot;</p>
              </div>
            </div>
            
            {/* Popular searches */}
            <div className="mt-10">
              <p className="text-theme-tertiary mb-4">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Harry Potter', 'Stephen King', 'Science Fiction', 'Mystery', 'Romance', 'Biography'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="bg-white/5 dark:bg-white/5 light:bg-black/5 px-4 py-2 rounded-full text-sm text-theme-secondary border border-white/5 dark:border-white/5 light:border-black/5 hover:border-purple-500/50 hover:text-theme-primary transition-all duration-300 hover:scale-105 hover:shadow-neon"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}