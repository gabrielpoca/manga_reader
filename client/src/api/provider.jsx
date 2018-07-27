import React from 'react';
import { GraphQLClient } from 'graphql-request';

import Context from './context';
import signature from './queryToID';

// const cache = new Cache();
const client = new GraphQLClient('http://localhost:4000/api', {});

class Provider extends React.Component {
  constructor() {
    super();

    this.state = {
      context: {
        request: this.request
      }
    };
  }

  request = (query, variables) => {
    // const data = cache.get(signature(query, variables));
    // if (data) {
    //   return new Promise(resolve => resolve(data));
    // }
    // return client.request(query, variables).then(data => {
    //   cache.save(signature(query, variables), data);
    //   return data;
    // });
  };

  render() {
    return (
      <Context.Provider value={this.state.context}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
