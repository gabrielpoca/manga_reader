import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { slide as BurgerMenu } from 'react-burger-menu'
import { Link } from 'react-router-dom'

import styles from './styles.css'

class Menu extends Component {
  render() {
    return (
      <div styleName="root">
        <BurgerMenu width={'320px'} right>
          <Link styleName="link" to="/">
            Home
          </Link>
          <Link styleName="link" to="/terms">
            Terms of use
          </Link>
          <Link styleName="link" to="/settings">
            Settings
          </Link>
          <a
            styleName="link"
            href="https://github.com/gabrielpoca/manga"
            rel="noopener noreferrer"
            target="_blank"
          >
            Source Code @ Github
          </a>
          <a
            styleName="link"
            href="https://twitter.com/gabrielgpoca"
            rel="noopener noreferrer"
            target="_blank"
          >
            built by Gabriel Poça
          </a>
        </BurgerMenu>
      </div>
    )
  }
}

export default CSSModules(Menu, styles, { allowMultiple: true })
