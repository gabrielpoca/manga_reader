import * as React from 'react'
import CSSModues from 'react-css-modules'

import Search from '../Search'
import BackButton from '../BackButton'
import Menu from '../Menu'

import styles from './styles.css'

const search = props => (
  <Search
    onBlur={props.onBlur}
    onChange={props.onChange}
    value={props.search}
  />
)

const backNavigation = props => <BackButton to={props.withBackNavigation} />

const Header = props => {
  return (
    <header className={styles.root}>
      <div styleName="search">
        {props.withBackNavigation ? backNavigation(props) : search(props)}
      </div>
      <div styleName="menu">
        <Menu />
      </div>
    </header>
  )
}

export default CSSModues(Header, styles)
