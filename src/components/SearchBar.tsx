'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="
            w-full pl-10 pr-4 py-3 
            rounded-full border border-gray-300 
            bg-white text-gray-800 
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-colors
          "
          minLength={1}
          required
        />
      </div>
      <button
        type="submit"
        className="
          px-6 py-3 rounded-full bg-indigo-500 text-white font-medium
          hover:bg-indigo-600 focus:outline-none 
          focus:ring-2 focus:ring-indigo-500
          transition-colors
        "
      >
        Search
      </button>
    </form>
  );
}
