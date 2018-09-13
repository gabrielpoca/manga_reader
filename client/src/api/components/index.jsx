import React from 'react';

import Context from '../context';

const withContext = Component => {
  class WrappedComponent extends React.Component {
    render() {
      return (
        <Context.Consumer>
          {context => (
            <Component {...this.props} {...context}>
              {this.props.children}
            </Component>
          )}
        </Context.Consumer>
      );
    }
  }

  return WrappedComponent;
};
