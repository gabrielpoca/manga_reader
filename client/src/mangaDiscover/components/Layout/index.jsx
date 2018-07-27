import * as React from 'react'
import CSSModules from 'react-css-modules'

import styles from './styles.css'

class MangaList extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>{this.props.header}</div>
        <div className={styles.content}>{this.props.children}</div>
      </div>
    )
  }
}

export default CSSModules(MangaList, styles)
