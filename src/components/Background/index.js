import React, { useEffect, useRef, useContext } from 'react'
import { useWinSize } from '../../utils/hooks'
import styled from 'styled-components'
import { GlobalContext } from '../../utils/GlobalContext'
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
const Background = (props) => {
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
      const duration = state.skipIntro ? 0 : 500

      background.moveToPoint({ x, y, duration })
    }
  }, [state.isPlayingIntro])

  useEffect(() => {
    canvasContainer.current.appendChild(background.domElement)
    window.requestAnimationFrame(() => {
      background.show()
    })
  }, [])

  return (
    <CanvasContainer ref={canvasContainer} />
  )
}

export default Background
