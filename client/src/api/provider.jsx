import React from 'react';

import Context from './context';

class Provider extends React.Component {
  constructor() {
    super();

    this.state = {
      context: {}
    };
  }

  render() {
    return (
      <Context.Provider value={this.state.context}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
