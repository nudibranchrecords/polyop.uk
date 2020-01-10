import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { MultiFace } from './MultiFace'

const renderer = new THREE.WebGLRenderer({ alpha: true })
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, null, 1, 100000)
const group = new THREE.Group()
const planeGeom = new THREE.PlaneBufferGeometry(20, 20, 20)
const planeMat = new THREE.MeshBasicMaterial()
const hitPlane = new THREE.Mesh(planeGeom, planeMat)
const raycaster = new THREE.Raycaster()
const multiFace = new MultiFace()
const light = new THREE.PointLight()
const clock = new THREE.Clock()

scene.add(light)
group.add(multiFace.root)

planeMat.visible = false
hitPlane.position.z = -10

scene.add(group)
scene.add(hitPlane)
camera.position.z = 5

group.visible = false

const effectPos = {
  x: 0,
  y: 0,
  z: 0,
}

const params = {
  shiftZSpeed: 0,
  rotSpeedX: 0.1,
  rotSpeedY: 0.2,
  pieceRotSpeedX: 0.01,
  pieceRotSpeedY: 0.02,
  pieceRotSpeedZ: 0,
  pieceScale: 0.2,
  basePieceScale: 0,
  scaleSpeed: 0.2,
  shiftX: 0.2,
  shiftY: 0.2,
  shiftZ: 0.2,
  orbScale: 1,
  eyeScale0: 1,
  eyeScale1: 1,
}

export const domElement = renderer.domElement

const animate = () => {
  window.requestAnimationFrame(animate)
  TWEEN.update()

  renderer.render(scene, camera)
  group.position.set(effectPos.x, effectPos.y, effectPos.z)

  multiFace.update(params, clock.getDelta(), clock.getElapsedTime())
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

    multiFace.moveToPoint(newPos)
  }
}

export const show = () => {
  group.visible = true
}

animate()
