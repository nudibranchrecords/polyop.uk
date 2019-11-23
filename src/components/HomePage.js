import React from 'react'
import titleSvg from '../assets/title.svg'
import Contain from './Contain'
import Video from './Video'
import styled from 'styled-components'

const Blurb = styled.div`
  text-align: center;
`

const HomePage = () => (
  <Contain>
    <h2><img src={titleSvg} alt='Polyop' /></h2>
    <Video url='https://player.vimeo.com/video/311982295' width='640' height='360' />
    <Blurb>
      <p>Polyop are a live electronic music and audiovisual group ipsum dolor sit amet, consectetur adipiscin.</p>
    </Blurb>
  </Contain>
)

export default HomePage
