import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'

const renderer = new THREE.WebGLRenderer({ alpha: true })
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, null, 1, 100000)
const cubeGeom = new THREE.BoxBufferGeometry(1, 1, 1)
const cubeMat = new THREE.MeshNormalMaterial()
const cube = new THREE.Mesh(cubeGeom, cubeMat)
const planeGeom = new THREE.PlaneBufferGeometry(20, 20, 20)
const planeMat = new THREE.MeshBasicMaterial()
const hitPlane = new THREE.Mesh(planeGeom, planeMat)
const raycaster = new THREE.Raycaster()

planeMat.visible = false
hitPlane.position.z = -10

scene.add(cube)
scene.add(hitPlane)
camera.position.z = 5

cube.visible = false

const effectPos = {
  x: 0,
  y: 0,
  z: 0,
}

export const domElement = renderer.domElement

const animate = () => {
  window.requestAnimationFrame(animate)
  TWEEN.update()

  renderer.render(scene, camera)
  cube.position.set(effectPos.x, effectPos.y, effectPos.z)
}

export const resize = ({ width, height }) => {
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

export const moveToPoint = ({ x, y, duration = 500 }) => {
  const point = new THREE.Vector2()
  point.x = x
  point.y = y
  raycaster.setFromCamera(point, camera)

  const interesects = raycaster.intersectObject(hitPlane)[0]

  if (interesects) {
    const newPos = interesects.point
    new TWEEN.Tween(effectPos)
      .to({ x: newPos.x, y: newPos.y, z: newPos.z }, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
  }
}

export const show = () => {
  cube.visible = true
}

animate()
