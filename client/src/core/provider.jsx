import React from 'react';
import { connect } from 'react-redux';

import * as manga from '../manga';
import Context from './context';

class Provider extends React.Component {
  constructor() {
    super();

    this.state = {
      context: {},
    };
  }

  render() {
    if (!this.props.ready) return null;

    return (
      <Context.Provider value={this.state.context}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default connect(state => ({ ready: manga.filters.ready(state) }))(
  Provider
);
