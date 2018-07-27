import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import CSSModules from 'react-css-modules'

import Button from '../../../components/Button'

import styles from './styles.css'

class FileButton extends Component {
  shouldComponentUpdate() {
    return false
  }

  handleClick = () => {
    findDOMNode(this.fileInput).click()
  }

  handleFile = event => this.props.onChange(event.target.files[0])

  render() {
    return (
      <div styleName="root">
        <input
          accept=".json"
          styleName="input"
          ref={el => (this.fileInput = el)}
          onChange={this.handleFile}
          type="file"
        />
        <Button onClick={this.handleClick}>Restore Backup</Button>
      </div>
    )
  }
}

export default CSSModules(FileButton, styles)
