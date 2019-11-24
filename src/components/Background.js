import React, { useEffect, useRef } from 'react'
import { useWinSize } from '../utils/hooks'
import styled from 'styled-components'
import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer({ alpha: true })
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, null, 1, 100000)
const cubeGeom = new THREE.BoxBufferGeometry(1, 1, 1)
const cubeMat = new THREE.MeshNormalMaterial()
const cube = new THREE.Mesh(cubeGeom, cubeMat)

scene.add(cube)
camera.position.z = 5

const animate = () => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.02
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

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

  useEffect(() => {
    const { w, h } = winSize
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }, [winSize])

  // Will only fire on first render
  useEffect(() => {
    canvasContainer.current.appendChild(renderer.domElement)
    animate()
  }, [])

  return (
    <CanvasContainer ref={canvasContainer} />
  )
}

export default Background
