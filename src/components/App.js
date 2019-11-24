import React, { useState } from 'react'
import { GlobalContextProvider } from './GlobalContext'
import Router from './Router'
import Background from './Background'

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
    <GlobalContextProvider value={state}>
      <Background />
      <Router />
    </GlobalContextProvider>
  )
}

export default App
