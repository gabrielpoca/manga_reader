import * as React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'

import { H3 } from '../../../components/Heading'

import styles from './styles.css'

class EmptyMangaList extends React.Component {
  render() {
    if (this.props.hasQuery) {
      return (
        <div styleName="message">
          <H3 level="none">
            I cannot find anything for that query. Try to write it in a
            different way. It can also be the case that I don't have that manga.
          </H3>
        </div>
      )
    }

    return (
      <div styleName="message">
        <H3 level="none">
          Hello! If this is your first time using this application, use the
          search button on the top to look for your favorite mangas and start
          reading. If you are already a user you can{' '}
          <Link to="/settings">restore your progress from back-up</Link>.
        </H3>
      </div>
    )
  }
}

export default CSSModules(EmptyMangaList, styles)
