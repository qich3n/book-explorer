'use client';

import { useEffect, useState, useMemo } from 'react';
import BookCard from './BookCard';
import LoadingSpinner from './LoadingSpinner';

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

interface BookListProps {
  searchQuery: string;
  sortOption: string;
}

export default function BookList({ searchQuery, sortOption }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const fetchBooks = async (pageNum: number, isLoadMore = false) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Basic search without sorting
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&page=${pageNum}&limit=20`;
      console.log('Fetching from:', url);

      const response = await fetch(url);

      if (!response.ok) throw new Error('Failed to fetch books');

      const data = await response.json();
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newBooks = data.docs.map((book: any) => ({
        key: book.key,
        title: book.title || 'Unknown Title',
        author_name: book.author_name || ['Unknown Author'],
        first_publish_year: book.first_publish_year || 0,
        cover_i: book.cover_i,
      }));

      setBooks(prev => isLoadMore ? [...prev, ...newBooks] : newBooks);
      setTotalResults(data.numFound || 0);
      setHasMore(newBooks.length === 20 && (pageNum * 20) < data.numFound);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset and fetch when search query changes
  useEffect(() => {
    setPage(1);
    fetchBooks(1);
  }, [searchQuery]);

  // Sort books client-side
  const sortedBooks = useMemo(() => {
    const sorted = [...books];
    
    switch (sortOption) {
      case 'new':
        sorted.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
        break;
      case 'old':
        sorted.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Keep original order for relevance
        return books;
    }
    
    return sorted;
  }, [books, sortOption]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBooks(nextPage, true);
  };

  if (error) return (
    <div className="text-center">
      <p className="text-red-500 mb-4">{error}</p>
      <button 
        onClick={() => fetchBooks(page)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );

  if (!searchQuery) return (
    <div className="text-center text-gray-500">
      <p className="mb-4">Enter a search term to find books</p>
      <p className="text-sm">Try searching for your favorite author or book title</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {sortedBooks.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-gray-600">
            Showing {sortedBooks.length} of {totalResults.toLocaleString()} results
          </p>
          {sortOption !== 'relevance' && (
            <p className="text-gray-600">
              Sorted by: {
                sortOption === 'new' ? 'Newest First' : 
                sortOption === 'old' ? 'Oldest First' : 
                'Title A-Z'
              }
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedBooks.map((book) => (
          <BookCard
            key={book.key}
            title={book.title}
            author={book.author_name}
            year={book.first_publish_year}
            coverId={book.cover_i}
          />
        ))}
      </div>
      
      {loading && <LoadingSpinner />}
      
      {!loading && hasMore && books.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Load More
          </button>
        </div>
      )}
      
      {!loading && !hasMore && books.length > 0 && (
        <p className="text-center text-gray-500 mt-8">No more books to load</p>
      )}

      {!loading && books.length === 0 && (
        <p className="text-center text-gray-500">No books found for &quot;{searchQuery}&quot;</p>
      )}
    </div>
  );
}