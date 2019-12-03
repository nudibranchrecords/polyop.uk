import React, { useState } from 'react'
import { GlobalContextProvider } from '../utils/GlobalContext'
import Background from './Background'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './Header'

// Pages
import HomePage from './HomePage'
import ReleasesPage from './ReleasesPage'
import ShowsPage from './ShowsPage'
import AboutPage from './AboutPage'
import StyleguidePage from './StyleguidePage'
import NotFoundPage from './NotFoundPage'

const Content = styled.div`
  position: relative;
`

const App = () => {
  const setIsPlayingIntro = (isPlayingIntro) => {
    setState({ ...state, isPlayingIntro })
  }

  const initState = {
    isPlayingIntro: true,
    setIsPlayingIntro,
  }

  const [state, setState] = useState(initState)

  return (
    <Router>
      <GlobalContextProvider value={state}>
        <Background />
        <Header />
        <Content>
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route path='/releases'>
              <ReleasesPage />
            </Route>
            <Route path='/shows'>
              <ShowsPage />
            </Route>
            <Route path='/about'>
              <AboutPage />
            </Route>
            <Route path='/styleguide'>
              <StyleguidePage />
            </Route>
            <Route path='*'>
              <NotFoundPage />
            </Route>
          </Switch>
        </Content>
      </GlobalContextProvider>
    </Router>
  )
}

export default App
