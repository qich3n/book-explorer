'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import BookList from '@/components/BookList';
import SortSelector from '@/components/SortSelector';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('relevance');

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-900 to-black">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Book Explorer
          </h1>
          <p className="text-gray-400 text-lg">
            Discover your next favorite book
          </p>
        </div>

        {/* Search and Sort Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-2/3">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            <div className="w-full md:w-auto">
              <SortSelector onSort={setSortOption} />
            </div>
          </div>
        </div>

        {/* Book List Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <BookList
            searchQuery={searchQuery}
            sortOption={sortOption}
          />
        </div>
      </div>
    </main>
  );
}