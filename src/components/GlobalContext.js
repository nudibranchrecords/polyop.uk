import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const GlobalContext = React.createContext({
  isPlayingIntro: true,
  setIsPlayingIntro: () => {},
})

export const GlobalContextProvider = ({ children }) => {
  const setIsPlayingIntro = (isPlayingIntro) => {
    setState({ ...state, isPlayingIntro })
  }

  const initState = {
    isPlayingIntro: true,
    setIsPlayingIntro,
  }

  const [state, setState] = useState(initState)

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider

GlobalContextProvider.propTypes = {
  children: PropTypes.node,
}
