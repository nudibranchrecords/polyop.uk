import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'simple-react-router'
import { devices } from '../utils/globalVars'
import { GlobalContext } from './GlobalContext'

const navHeightS = '3rem'
const navHeightM = '5rem'

const Nav = styled.nav`
  height: ${navHeightS};
  position: relative;
  margin-bottom: 1rem;
  opacity: ${props => props.isHidden ? '0' : '1'};
  transition: 0.3s;

  @media ${devices.tablet} {
    height: ${navHeightM};
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    text-align: center;
    position: fixed;
    width: 100%;
    height: ${navHeightS};
    align-items: center;

    @media ${devices.tablet} {
      height: ${navHeightM};
    }
  }

  li {
    flex: 1;

    &:first-child {
      opacity: 0;
    }
  }

  a {
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    display: block;
    width: 80%;
  }
`

const Header = () => {
  const state = useContext(GlobalContext)
  return (
    <Nav isHidden={state.isPlayingIntro}>
      <ul>
        <li id='link_home'><Link href='/'>Home</Link></li>
        <li><Link href='/releases'>Releases</Link></li>
        <li><Link href='/shows'>Shows</Link></li>
        <li><Link href='/about'>About</Link></li>
      </ul>
    </Nav>
  )
}

export default Header
