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
      {/* 
        Added a subtle box-shadow and changed the container to provide more vertical padding.
        Also added a max-w-5xl to prevent the content from stretching too wide on large screens.
      */}
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* 
            Slightly larger text sizes and added a gradient text effect example (optional).
          */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-4 tracking-tight">
            Book Explorer
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Discover your next favorite book
          </p>
        </div>

        {/* Search and Sort Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/10 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* 
              Widened the search bar for desktop, so it takes more space.
            */}
            <div className="w-full md:w-3/4">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            <div className="w-full md:w-1/4 flex justify-end">
              <SortSelector onSort={setSortOption} />
            </div>
          </div>
        </div>

        {/* Book List Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-md">
          <BookList
            searchQuery={searchQuery}
            sortOption={sortOption}
          />
        </div>
      </div>
    </main>
  );
}
