'use client';

import { useEffect, useState, useMemo } from 'react';
import BookCard from './BookCard';
import LoadingSpinner from './LoadingSpinner';
import { BookOpen, Search, Sparkles, AlertCircle, TrendingUp, Filter } from 'lucide-react';

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
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Animation state for staggered loading
  const [showBooks, setShowBooks] = useState<boolean[]>([]);

  // -----------------------------
  // Fetching Logic
  // -----------------------------
  const fetchBooks = async (pageNum: number, isLoadMore = false) => {
    if (!searchQuery.trim()) return;

    if (isLoadMore) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
      setShowBooks([]);
    }
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

      setBooks((prev) => {
        const updated = isLoadMore ? [...prev, ...newBooks] : newBooks;
        
        // Stagger animation for new books
        if (!isLoadMore) {
          setTimeout(() => {
            updated.forEach((_, index) => {
              setTimeout(() => {
                setShowBooks(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 100);
            });
          }, 100);
        } else {
          // For load more, show existing books immediately and animate new ones
          const existingCount = prev.length;
          setShowBooks(prevShow => {
            const newState = [...prevShow, ...new Array(newBooks.length).fill(false)];
            newBooks.forEach((_, index) => {
              setTimeout(() => {
                setShowBooks(prev => {
                  const updatedState = [...prev];
                  updatedState[existingCount + index] = true;
                  return updatedState;
                });
              }, index * 100);
            });
            return newState;
          });
        }
        
        return updated;
      });
      
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
      setIsLoadingMore(false);
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
      <div className="text-center py-12 animate-slide-up">
        <div className="glass-effect rounded-2xl p-8 border border-red-500/20 bg-red-500/5 max-w-md mx-auto">
          <div className="mb-4">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-red-300 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-400 mb-6">{error}</p>
          </div>
          
          <button
            onClick={() => fetchBooks(page)}
            className="
              px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl 
              hover:from-red-600 hover:to-red-700 transition-all duration-300 
              hover:scale-105 hover:shadow-neon font-medium
              border border-red-500/30
            "
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------
  // No Search Yet
  // -----------------------------
  if (!searchQuery) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="glass-effect rounded-3xl p-12 border border-white/10 shadow-glass max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-full">
                  <Search className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to discover?
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Use the search above to explore millions of books
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { icon: BookOpen, label: 'Titles', color: 'purple' },
              { icon: Search, label: 'Authors', color: 'blue' },
              { icon: Sparkles, label: 'Subjects', color: 'pink' }
            ].map((item, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl p-4 border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-105 group"
              >
                <item.icon className={`w-8 h-8 text-${item.color}-400 mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                <p className="text-gray-300 text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Main Render
  // -----------------------------
  return (
    <div className="space-y-8">
      {/* Results Header */}
      {sortedBooks.length > 0 && (
        <div className="glass-effect p-6 rounded-2xl border border-white/10 shadow-glass animate-slide-up">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">
                  {sortedBooks.length.toLocaleString()} of {totalResults.toLocaleString()} results
                </p>
                <p className="text-gray-400 text-sm">
                  for &quot;{searchQuery}&quot;
                </p>
              </div>
            </div>
            
            {sortOption !== 'relevance' && (
              <div className="flex items-center gap-2 glass-effect px-4 py-2 rounded-lg border border-white/5">
                <Filter className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">
                  Sorted by: <span className="font-medium text-white">
                    {sortOption === 'new'
                      ? 'Newest First'
                      : sortOption === 'old'
                      ? 'Oldest First'
                      : 'Title A-Z'}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sortedBooks.map((book, index) => (
          <div
            key={book.key}
            className={`
              transition-all duration-500 transform
              ${showBooks[index] 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
              }
            `}
            style={{ 
              transitionDelay: `${(index % 20) * 50}ms`,
              animationDelay: `${(index % 20) * 50}ms`
            }}
          >
            <BookCard
              bookKey={book.key}
              title={book.title}
              author={book.author_name}
              year={book.first_publish_year ?? undefined}
              coverId={book.cover_i}
            />
          </div>
        ))}
      </div>

      {/* Loading States */}
      {loading && (
        <div className="animate-fade-in">
          <LoadingSpinner 
            size="lg" 
            text="Searching for books..." 
            variant="books" 
          />
        </div>
      )}

      {/* Load More Section */}
      {!loading && hasMore && books.length > 0 && (
        <div className="flex flex-col items-center pt-8 animate-slide-up">
          <div className="glass-effect rounded-2xl p-6 border border-white/10 text-center max-w-md">
            <p className="text-gray-300 mb-4">
              Showing {books.length} of {totalResults.toLocaleString()} books
            </p>
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="
                relative px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 
                text-white rounded-xl font-semibold
                hover:from-purple-600 hover:to-blue-600 
                disabled:from-gray-600 disabled:to-gray-700
                transition-all duration-300 hover:scale-105 hover:shadow-neon
                border border-purple-500/30 hover:border-purple-400/50
                backdrop-blur-sm overflow-hidden group
                disabled:cursor-not-allowed disabled:scale-100
              "
            >
              {/* Button shimmer effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              
              <span className="relative z-10 flex items-center gap-2">
                {isLoadingMore ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Books
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Load More Loading */}
      {isLoadingMore && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {[...Array(8)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="animate-pulse"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="glass-effect rounded-2xl border border-white/10 overflow-hidden">
                <div className="aspect-[2/3] bg-gradient-to-br from-slate-700 to-slate-600 shimmer"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-white/10 rounded-lg shimmer"></div>
                  <div className="h-3 bg-white/5 rounded-lg w-3/4 shimmer"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-white/5 rounded-full w-16 shimmer"></div>
                    <div className="h-6 bg-white/5 rounded-full w-20 shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* End of Results */}
      {!loading && !hasMore && books.length > 0 && (
        <div className="text-center pt-12 animate-fade-in">
          <div className="glass-effect rounded-2xl p-8 border border-white/10 max-w-md mx-auto">
            <div className="mb-4">
              <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-3 opacity-70" />
              <h3 className="text-lg font-semibold text-white mb-2">That&apos;s all for now!</h3>
              <p className="text-gray-400">
                You&apos;ve explored all {totalResults.toLocaleString()} results for &quot;{searchQuery}&quot;
              </p>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <p className="text-gray-500 text-sm">
                Try a different search term to discover more books
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && books.length === 0 && searchQuery && (
        <div className="text-center py-16 animate-slide-up">
          <div className="glass-effect rounded-3xl p-12 border border-white/10 max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-gray-600 to-gray-700 p-6 rounded-full">
                    <Search className="w-12 h-12 text-gray-300" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">
                No books found
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We couldn&apos;t find any books matching &quot;{searchQuery}&quot;
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-400 font-medium">Try searching for:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Harry Potter',
                  'Science Fiction',
                  'Stephen King',
                  'Mystery',
                  'Romance',
                  'Fantasy'
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => window.location.href = `/?q=${encodeURIComponent(suggestion)}`}
                    className="
                      glass-effect px-4 py-2 rounded-full text-sm text-gray-300 
                      border border-white/10 hover:border-purple-500/50 
                      hover:text-white transition-all duration-300 hover:scale-105
                    "
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}