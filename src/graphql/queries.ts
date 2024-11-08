import { gql } from '@apollo/client';

export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!, $page: Int, $sort: String) {
    searchBooks(query: $query, page: $page, sort: $sort) {
      docs {
        key
        title
        author_name
        first_publish_year
        cover_i
        description
        subjects
        isbn
        publisher
        publish_places
      }
      numFound
      start
      hasMore
    }
  }
`;

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  description?: string;
  subjects?: string[];
  isbn?: string[];
  publisher?: string[];
  publish_places?: string[];
}

export interface SearchBooksResponse {
  docs: Book[];
  numFound: number;
  start: number;
  hasMore: boolean;
}