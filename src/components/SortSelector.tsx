'use client';

import { ChevronDown } from 'lucide-react';

interface SortSelectorProps {
  onSort: (option: string) => void;
}

export default function SortSelector({ onSort }: SortSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-select"
        className="text-gray-700 font-medium whitespace-nowrap"
      >
        Sort by:
      </label>

      {/* Wrapper for the select + icon */}
      <div className="relative">
        <select
          id="sort-select"
          onChange={(e) => onSort(e.target.value)}
          defaultValue="relevance"
          className="
            w-full md:w-auto
            appearance-none
            px-4 py-2
            border border-gray-300
            rounded-full
            bg-white
            text-gray-900
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            pr-10
            transition-colors
          "
        >
          <option value="relevance">Relevance</option>
          <option value="new">Newest First</option>
          <option value="old">Oldest First</option>
          <option value="title">Title A-Z</option>
        </select>

        {/* Dropdown icon positioned on the right */}
        <ChevronDown
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-gray-500
          "
          size={18}
        />
      </div>
    </div>
  );
}
