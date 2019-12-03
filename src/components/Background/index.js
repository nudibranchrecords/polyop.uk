import React, { useEffect, useRef, useContext } from 'react'
import { useWinSize } from '../../utils/hooks'
import styled from 'styled-components'
import { GlobalContext } from '../GlobalContext'
import * as background from './background'

const CanvasContainer = styled.div`
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
const Background = () => {
  const winSize = useWinSize()
  const canvasContainer = useRef()
  const state = useContext(GlobalContext)

  useEffect(() => {
    const { width, height } = winSize
    background.resize({ width, height })
  }, [winSize])

  useEffect(() => {
    if (!state.isPlayingIntro) {
      const el = document.getElementById('link_home')
      const bbox = el.getBoundingClientRect()

      const x = ((bbox.left + bbox.width / 2) / window.innerWidth) * 2 - 1
      const y = -((bbox.top + bbox.height / 2) / window.innerHeight) * 2 + 1

      background.moveToPoint({ x, y })
    }
  }, [state.isPlayingIntro])

  // Will only fire on first render
  useEffect(() => {
    canvasContainer.current.appendChild(background.domElement)
    background.animate()
  }, [])

  return (
    <CanvasContainer ref={canvasContainer} />
  )
}

export default Background
