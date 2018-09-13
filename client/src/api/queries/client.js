import { GraphQLClient } from 'graphql-request';

import url from './url';

const client = new GraphQLClient(url, {});

export default client;
