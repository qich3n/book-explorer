'use client';

import { useEffect, useState, useMemo } from 'react';
import BookCard from './BookCard';
import LoadingSpinner from './LoadingSpinner';

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number | null;
  cover_i?: number;
}

interface BookListProps {
  searchQuery: string;
  sortOption: string;
}

interface APIResponse {
  docs: Book[];
  numFound: number;
  start: number;
}

export default function BookList({ searchQuery, sortOption }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  // -----------------------------
  // Fetching Logic
  // -----------------------------
  const fetchBooks = async (pageNum: number, isLoadMore = false) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const url = new URL('https://openlibrary.org/search.json');
      url.searchParams.append('q', searchQuery.trim());
      url.searchParams.append('page', pageNum.toString());
      url.searchParams.append('limit', '20');
      url.searchParams.append(
        'fields',
        'key,title,author_name,first_publish_year,cover_i'
      );

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: APIResponse = await response.json();
      const newBooks: Book[] = data.docs.map((book) => ({
        key: book.key,
        title: book.title || 'Unknown Title',
        author_name: book.author_name || ['Unknown Author'],
        first_publish_year: book.first_publish_year || null,
        cover_i: book.cover_i,
      }));

      setBooks((prev) => (isLoadMore ? [...prev, ...newBooks] : newBooks));
      setTotalResults(data.numFound || 0);
      setHasMore(newBooks.length === 20 && pageNum * 20 < data.numFound);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to fetch books. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Client-Side Sorting Logic
  // -----------------------------
  const sortedBooks = useMemo(() => {
    const sorted = [...books];

    const compareStrings = (a: string, b: string) =>
      a.localeCompare(b, undefined, { sensitivity: 'base' });

    const compareYears = (a: number | null, b: number | null) => {
      if (a === null && b === null) return 0;
      if (a === null) return 1;
      if (b === null) return -1;
      return a - b;
    };

    switch (sortOption) {
      case 'new':
        return sorted.sort((a, b) => {
          const yearComparison = compareYears(
            b.first_publish_year ?? null,
            a.first_publish_year ?? null
          );
          return yearComparison !== 0
            ? yearComparison
            : compareStrings(a.title, b.title);
        });
      case 'old':
        return sorted.sort((a, b) => {
          const yearComparison = compareYears(
            a.first_publish_year ?? null,
            b.first_publish_year ?? null
          );
          return yearComparison !== 0
            ? yearComparison
            : compareStrings(a.title, b.title);
        });
      case 'title':
        return sorted.sort((a, b) => {
          const titleComparison = compareStrings(a.title, b.title);
          return titleComparison !== 0
            ? titleComparison
            : (b.first_publish_year ?? 0) - (a.first_publish_year ?? 0);
        });
      default:
        return books; // "relevance" is just the original API order
    }
  }, [books, sortOption]);

  // -----------------------------
  // Effects
  // -----------------------------
  useEffect(() => {
    setPage(1);
    fetchBooks(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // -----------------------------
  // Pagination Handler
  // -----------------------------
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBooks(nextPage, true);
  };

  // -----------------------------
  // Error State
  // -----------------------------
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => fetchBooks(page)}
          className="
            px-6 py-2 bg-indigo-500 text-white rounded-full 
            hover:bg-indigo-600 transition-colors duration-200 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 
            focus:ring-offset-2
          "
        >
          Try Again
        </button>
      </div>
    );
  }

  // -----------------------------
  // No Search Yet
  // -----------------------------
  if (!searchQuery) {
    return (
      <div 
        className="
          text-center py-12 
          rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 
          shadow-md
        "
      >
        <h2 className="text-2xl text-gray-200 font-semibold mb-4">
          Welcome to Book Explorer
        </h2>
        <p className="text-gray-400 mb-2">
          Enter a search term to discover books
        </p>
        <p className="text-gray-500 text-sm">
          Try searching by title, author, or subject
        </p>
      </div>
    );
  }

  // -----------------------------
  // Main Render
  // -----------------------------
  return (
    <div className="space-y-6">
      {/* Results Info */}
      {sortedBooks.length > 0 && (
        <div 
          className="
            bg-white/5 backdrop-blur-sm p-4 rounded-xl 
            border border-white/10 shadow-md
          "
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p className="text-gray-200">
              Showing <span className="font-semibold">{sortedBooks.length}</span>{' '}
              of{' '}
              <span className="font-semibold">
                {totalResults.toLocaleString()}
              </span>{' '}
              results
            </p>
            {sortOption !== 'relevance' && (
              <p className="text-gray-200">
                Sorted by:{' '}
                <span className="font-medium">
                  {sortOption === 'new'
                    ? 'Newest First'
                    : sortOption === 'old'
                    ? 'Oldest First'
                    : 'Title A-Z'}
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedBooks.map((book) => (
          <BookCard
            key={book.key}
            bookKey={book.key}
            title={book.title}
            author={book.author_name}
            year={book.first_publish_year ?? undefined}
            coverId={book.cover_i}
          />
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      )}

      {/* Load More */}
      {!loading && hasMore && books.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="
              px-8 py-3 bg-indigo-500 text-white rounded-full 
              hover:bg-indigo-600 transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              focus:ring-offset-2
            "
          >
            Load More Books
          </button>
        </div>
      )}

      {/* End of Results */}
      {!loading && !hasMore && books.length > 0 && (
        <p 
          className="
            text-center text-gray-400 mt-8 py-4 
            border-t border-white/10
          "
        >
          You&apos;ve reached the end of the results
        </p>
      )}

      {/* No Results */}
      {!loading && books.length === 0 && (
        <div 
          className="
            text-center py-12 
            rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 
            shadow-md
          "
        >
          <p className="text-gray-200 mb-2">
            No books found for &quot;{searchQuery}&quot;
          </p>
          <p className="text-gray-400">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}
