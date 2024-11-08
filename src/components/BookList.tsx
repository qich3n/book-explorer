'use client';

import { useEffect, useState } from 'react';
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
}

export default function BookList({ searchQuery }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery.trim()) return;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=20`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        console.log('API Response:', data); // Debug log

        if (data.docs && Array.isArray(data.docs)) {
          setBooks(data.docs);
        } else {
          setBooks([]);
        }
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to prevent too many API calls while typing
    const timeoutId = setTimeout(() => {
      fetchBooks();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!searchQuery) return <p className="text-center text-gray-500">Enter a search term to find books</p>;
  if (books.length === 0) return <p className="text-center text-gray-500">No books found for "{searchQuery}"</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.key}
          title={book.title}
          author={book.author_name}
          year={book.first_publish_year}
          coverId={book.cover_i}
        />
      ))}
    </div>
  );
}