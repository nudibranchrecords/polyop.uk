import React from 'react'
import SimpleReactRouter from 'simple-react-router'
import HomePage from './HomePage'
import ReleasesPage from './ReleasesPage'
import ShowsPage from './ShowsPage'
import AboutPage from './AboutPage'
import StyleguidePage from './StyleguidePage'
import NotFoundPage from './NotFoundPage'
import Header from './Header'

// Wrap the component in main page layout
const $ = PageComponent => () =>
  <>
    <Header />
    <PageComponent />
  </>

export default class Router extends SimpleReactRouter {
  routes (map) {
    map('/', $(HomePage))
    map('/releases', $(ReleasesPage))
    map('/shows', $(ShowsPage))
    map('/about', $(AboutPage))
    map('/styleguide', $(StyleguidePage))
    map('/:path*', $(NotFoundPage)) // catchall route
  }
}
