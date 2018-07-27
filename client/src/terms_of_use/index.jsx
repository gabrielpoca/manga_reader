import * as React from 'react'
import { Route } from 'react-router-dom'
import CSSModules from 'react-css-modules'

import { H1 } from '../components/Heading'
import Header from '../components/Header'
import styles from './styles.css'

const TermsOfUse = CSSModules(
  () => (
    <div styleName="root">
      <div styleName="header">
        <Header withBackNavigation="/" />
      </div>
      <div styleName="content">
        <H1>Terms and Conditions</H1>
        <p styleName="p">
          Manga Reader is one of my side-projects. I made an effort to build an
          interface that has a decent reading experience in both desktop and
          mobile. When you read mangas, the application will select some
          chapters to put in the cache so that you can enjoy them when your
          connection is down. This also means that you usually don't have to
          wait for a chapter to load. It doesn't do anything else.
        </p>
        <p styleName="p">
          I do not collect any information. Everything I store, such as your
          reading progress or favorite mangas, is stored in your browser. If you
          do not create a back up before clearing the browser, or the computer,
          you will lose your progress. I also do not use cookies or analytics.
        </p>
        <p styleName="p">
          Manga Reader is stored in Digital Ocean. The mangas you read are
          served from an{' '}
          <a href="https://market.mashape.com/doodle/manga-scraper">
            API in Mashape
          </a>. There is a proxy in front of the API because the API requires an
          application key, but the proxy does not store anything.
        </p>
        <p styleName="p">
          Manga Reader is{' '}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/gabrielpoca/manga"
          >
            open source
          </a>{' '}
          and you can run it yourself.
        </p>
        <p styleName="p">
          I don't charge any money for Manga Reader, but if you to support me,
          please use bitcoin or ether.
        </p>
      </div>
    </div>
  ),
  styles
)

export default () => <Route exact={true} path="/terms" component={TermsOfUse} />
