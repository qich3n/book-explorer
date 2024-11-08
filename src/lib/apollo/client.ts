import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const getClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://openlibrary.org/graphql', // Note: Open Library doesn't actually have a GraphQL endpoint
      // For demonstration, we'll create a GraphQL wrapper around their REST API
    }),
    cache: new InMemoryCache(),
  });
};