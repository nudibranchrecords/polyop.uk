import * as THREE from 'three'

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

export const domElement = renderer.domElement

export const animate = () => {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

export const resize = ({ width, height }) => {
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

export const moveToPoint = ({ x, y }) => {
  const point = new THREE.Vector2()
  point.x = x
  point.y = y
  raycaster.setFromCamera(point, camera)

  const intersects = raycaster.intersectObject(hitPlane)
  if (intersects[0]) {
    cube.position.copy(intersects[0].point)
  }
}
