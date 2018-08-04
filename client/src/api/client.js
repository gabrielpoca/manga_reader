import { GraphQLClient } from 'graphql-request';

let client;

if (process.env.NODE_ENV === 'production') {
  client = new GraphQLClient('/api', {});
} else {
  client = new GraphQLClient('http://localhost:4000/api', {});
}

export default client;
