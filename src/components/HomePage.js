import React, { useContext, useEffect, useRef, useState } from 'react'
import titleSvg from '../assets/title.svg'
import Contain from './Contain'
import Video from './Video'
import styled from 'styled-components'
import { GlobalContext } from './GlobalContext'

const Blurb = styled.div`
  text-align: center;
`

const Main = styled.div(props => `
  transition: 0.5s;
  opacity: ${props.isHidden ? '0' : '1'};
  pointer-events: none;
`)

const HomePage = () => {
  const headerEl = useRef()

  const state = useContext(GlobalContext)
  const [isHidden, setIsHidden] = useState(state.isPlayingIntro)

  useEffect(() => {
    if (state.isPlayingIntro) {
      const bbox = headerEl.current.getBoundingClientRect()
      const cy = window.innerHeight / 2
      headerEl.current.style.transform = `translateY(${cy - bbox.y - (bbox.height / 2)}px)`
    } else {
      headerEl.current.style.transition = '0.3s'
      headerEl.current.style.transform = 'translateY(0px)'

      setTimeout(() => {
        setIsHidden(false)
      }, 1000)
    }
  })

  return (
    <Contain onClick={() => state.setIsPlayingIntro(false)}>
      <h2 ref={headerEl}><img src={titleSvg} alt='Polyop' /></h2>
      <Main isHidden={isHidden}>
        <Video url='https://player.vimeo.com/video/311982295' width={640} height={360} />
        <Blurb>
          <p>Polyop are a live electronic music and audiovisual group ipsum dolor sit amet, consectetur adipiscin.</p>
        </Blurb>
      </Main>

    </Contain>
  )
}

export default HomePage
