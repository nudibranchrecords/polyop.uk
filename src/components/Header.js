import React from 'react'
import styled from 'styled-components'
import { Link } from 'simple-react-router'

const navHeight = '3rem'

const Nav = styled.nav`
  height: ${navHeight};
  position: relative;
  margin-bottom: 1rem;
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    text-align: center;
    position: fixed;
    width: 100%;
    height: ${navHeight};
    align-items: center;
    background: black;
  }

  li {
    flex: 1;
  }

  a {
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
  }
`

const Header = () => (
  <Nav>
    <ul>
      <li><Link href='/'>Home</Link></li>
      <li><Link href='/releases'>Releases</Link></li>
      <li><Link href='/shows'>Shows</Link></li>
      <li><Link href='/about'>About</Link></li>
    </ul>
  </Nav>
)

export default Header
