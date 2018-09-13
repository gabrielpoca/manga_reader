import React from 'react';

class UsageQuota extends React.Component {
  constructor() {
    super();
    this.state = { percentage: null };
  }

  async componentDidMount() {
    if (!navigator.storage) {
      return;
    }

    const { usage, quota } = await navigator.storage.estimate();

    this.setState({ percentage: Math.round(usage / quota) });
  }

  render() {
    return this.props.children(this.state);
  }
}

export default UsageQuota;
