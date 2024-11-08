import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const getClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://openlibrary.org/api/books', // We'll use REST API with Apollo's RESTDataSource
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  });
};