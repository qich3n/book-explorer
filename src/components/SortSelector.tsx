'use client';

interface SortSelectorProps {
  onSort: (option: string) => void;
}

export default function SortSelector({ onSort }: SortSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-gray-700 whitespace-nowrap">Sort by:</label>
      <select
        id="sort-select"
        onChange={(e) => onSort(e.target.value)}
        className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        defaultValue="relevance"
      >
        <option value="relevance">Relevance</option>
        <option value="new">Newest First</option>
        <option value="old">Oldest First</option>
        <option value="title">Title A-Z</option>
      </select>
    </div>
  );
}