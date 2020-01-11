import * as THREE from 'three'

import MouseSpeed from 'mouse-speed'

export const mousePos = new THREE.Vector2()
export const mouseVel = new THREE.Vector2()

document.addEventListener('mousemove', event => {
  mousePos.x = (event.clientX / window.innerWidth) * 2 - 1
  mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1
})

const onMouseSpeed = () => {
  mouseVel.x = mouseSpd.speedX
  mouseVel.y = mouseSpd.speedY
}

const mouseSpd = new MouseSpeed()
mouseSpd.init(onMouseSpeed)
