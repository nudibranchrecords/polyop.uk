import React, { useState } from 'react'
import { GlobalContextProvider } from './GlobalContext'
import Router from './Router'
import Background from './Background'
import styled from 'styled-components'

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
    <GlobalContextProvider value={state}>
      <Background />
      <Content><Router /></Content>
    </GlobalContextProvider>
  )
}

export default App
