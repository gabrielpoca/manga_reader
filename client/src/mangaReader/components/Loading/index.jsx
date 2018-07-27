import * as React from 'react'
import { Link } from 'react-router-dom'

import { H1, H3 } from '../../../components/Heading'

const styles = require('./styles.css')

const mangaName = props => {
  if (!props.manga) {
    return null
  }

  return (
    <Link to="/" className={styles.name}>
      <H3 level="h1">{props.manga.name}</H3>
    </Link>
  )
}

const Loading = props => {
  return (
    <div className={styles.root}>
      {mangaName(props)}
      <div className={styles.title}>
        <H1 level="h1">Loading chapter {props.chapterId}</H1>
      </div>
    </div>
  )
}

export default Loading
