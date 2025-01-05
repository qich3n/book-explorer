'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import BookList from '@/components/BookList';
import SortSelector from '@/components/SortSelector';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('relevance');

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h2 
          className="
            text-5xl md:text-6xl font-extrabold 
            text-transparent bg-clip-text 
            bg-gradient-to-r from-indigo-400 to-purple-500 
            mb-4
          "
        >
          Book Explorer
        </h2>
        <p className="text-gray-300 text-lg md:text-xl">
          Discover your next favorite book
        </p>
      </section>

      {/* Search & Sort Container */}
      <section 
        className="
          bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 
          shadow-md p-6 mb-8
        "
      >
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
          <div className="w-full md:w-3/4">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <div className="w-full md:w-auto flex justify-end">
            <SortSelector onSort={setSortOption} />
          </div>
        </div>
      </section>

      {/* Book List Section */}
      <section 
        className="
          bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 
          shadow-md p-6
        "
      >
        <BookList
          searchQuery={searchQuery}
          sortOption={sortOption}
        />
      </section>
    </main>
  );
}