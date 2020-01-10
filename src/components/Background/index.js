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
const normalizeSceenCoords = (oldX, oldY) => {
  const x = (oldX / window.innerWidth) * 2 - 1
  const y = -(oldY / window.innerHeight) * 2 + 1

  return { x, y }
}

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
      const { x, y } = normalizeSceenCoords(bbox.left + bbox.width / 2, bbox.top + bbox.height / 2)
      const duration = state.skipIntro ? 0 : 500

      background.moveToPoint({ x, y, duration })
    }
  }, [state.isPlayingIntro])

  // Will only fire once
  useEffect(() => {
    canvasContainer.current.appendChild(background.domElement)
    window.requestAnimationFrame(() => {
      background.show()
    })

    document.body.addEventListener('click', e => {
      const { x, y } = normalizeSceenCoords(e.clientX, e.clientY)
      background.moveToPoint({ x, y })
    })
  }, [])

  return (
    <CanvasContainer ref={canvasContainer} />
  )
}

export default Background
