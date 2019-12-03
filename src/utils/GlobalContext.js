import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

export const GlobalContext = React.createContext({
  isPlayingIntro: true,
  setIsPlayingIntro: () => {},
})

export const GlobalContextProvider = ({ children }) => {
  const setIsPlayingIntro = (isPlayingIntro) => {
    setState({ ...state, isPlayingIntro })
  }

  const location = useLocation()

  const initState = {
    isPlayingIntro: location.pathname === '/',
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
