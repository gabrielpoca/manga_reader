import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'

import Menu from '../../../components/Menu'
import Header from '../../../components/Header'
import BackButton from '../../../components/BackButton'
import { H1 } from '../../../components/Heading'
import Button from '../../../components/Button'
import FileButton from '../FileButton'

import styles from './styles.css'

class SettingsShow extends Component {
  renderUsage() {
    if (!this.props.usagePercentage || this.props.usagePercentage === 0) {
      return null
    }

    return (
      <div>
        This application is using {this.props.usagePercentage}% of its available
        space. The browser controls the available space, and the amount changes
        over time.
      </div>
    )
  }

  render() {
    return (
      <div styleName="root">
        <div styleName="header">
          <Header withBackNavigation="/" />
        </div>
        <div styleName="content">
          <div styleName="heading">
            <H1>Settings</H1>
          </div>
          <p styleName="info">
            I am not collecting any personal or usage information. Your progress
            is saved in this browser. Before you clear the browser, make sure
            you create a back-up or you will lose your progress.
          </p>
          <div styleName="button">
            <Button onClick={this.props.onBackup}>Make Backup</Button>
          </div>
          <div styleName="button">
            <FileButton onChange={this.props.onRestore} />
          </div>
          {this.renderUsage()}
        </div>
      </div>
    )
  }
}

export default CSSModules(SettingsShow, styles)
