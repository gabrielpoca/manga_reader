import * as React from 'react'
import { withRouter } from 'react-router'

// Scroll restoration based on https://reacttraining.com/react-router/web/guides/scroll-restoration.
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return null
  }
}

export default withRouter(ScrollToTop)
