'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import BookList from '@/components/BookList';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Book Explorer</h1>
        <div className="flex justify-center mb-8 md:mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>
        <BookList searchQuery={searchQuery} />
      </div>
    </main>
  );
}