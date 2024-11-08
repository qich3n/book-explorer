import { gql } from '@apollo/client';

export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!) {
    searchBooks(query: $query) {
      docs {
        key
        title
        author_name
        first_publish_year
        cover_i
      }
      numFound
    }
  }
`;

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export interface SearchBooksResponse {
  docs: Book[];
  numFound: number;
}