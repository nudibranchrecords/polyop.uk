import React from 'react'
import styled from 'styled-components'
import { Link } from 'simple-react-router'

const Nav = styled.nav`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    text-align: center;
  }

  li {
    flex: 1;
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
