import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super();

    this.state = {
      query: props.match.params.query || ''
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ query: props.match.params.query || '' });
  }

  active = () => {
    return this.state.query && this.state.query !== '';
  };

  handleSearch = query => {
    this.setState({ query });
  };

  handleSearchBlur = () => {
    if (this.state.query !== this.props.match.params.query) {
      this.props.history.push(`/${this.state.query}`);
    }
  };

  render() {
    return this.props.children({
      active: this.active(),
      onSearch: this.handleSearch,
      onBlur: this.handleSearchBlur,
      query: this.state.query
    });
  }
}
