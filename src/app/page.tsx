'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import BookList from '@/components/BookList';
import SortSelector from '@/components/SortSelector';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('relevance');

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Book Explorer</h1>
        
        <div className="space-y-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-2/3">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            <div className="w-full md:w-auto">
              <SortSelector onSort={setSortOption} />
            </div>
          </div>
        </div>

        <BookList 
          searchQuery={searchQuery} 
          sortOption={sortOption}
        />
      </div>
    </main>
  );
}