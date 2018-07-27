import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'

import { getNotifications } from '../../reducers'
import { removeNotification } from '../../actions'
import Notification from '../Notification'

import styles from './styles.css'

class Notifications extends Component {
  componentDidMount() {
    const timer = setInterval(this.clearNotification, 3000)
    this.setState({ timer })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  shouldComponentUpdate(props) {
    return this.props.notifications.length !== props.notifications.length
  }

  clearNotification = () => {
    this.props.notifications.forEach(({ id, date }) => {
      if ((new Date() - new Date(date)) / 1000 > 4) {
        this.props.removeNotification(id)
      }
    })
  }

  render() {
    return (
      <div styleName="root">
        {this.props.notifications.map(notif => (
          <div styleName="notification" key={notif.id}>
            <Notification {...notif} onClear={this.props.removeNotification} />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return { notifications: getNotifications(state) }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      removeNotification: removeNotification
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CSSModules(Notifications, styles)
)
