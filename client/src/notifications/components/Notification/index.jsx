import React, { Component } from 'react'
import CSSModules from 'react-css-modules'

import styles from './styles.css'

class Notification extends Component {
  handleClick = () => this.props.onClear(this.props.id)

  render() {
    return (
      <p
        role="alert"
        onClick={this.handleClick}
        styleName={this.props.type}
        key={this.props.id}
      >
        {this.props.message}
      </p>
    )
  }
}

export default CSSModules(Notification, styles)
