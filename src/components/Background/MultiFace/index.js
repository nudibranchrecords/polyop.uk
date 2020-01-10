import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import TWEEN from '@tweenjs/tween.js'

import bumpUrl from './bump.jpg'
import gltfUrl from './creator.glb'

const PI2 = Math.PI * 2

const mouse = new THREE.Vector2()

document.addEventListener('mousemove', event => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
})

const stoneMat = new THREE.MeshPhongMaterial({
  color: new THREE.Color(0xDDDDDD),
  bumpScale: 0.05,
})

const wireframeMat = new THREE.MeshBasicMaterial({
  color: new THREE.Color(0x00FF00),
  wireframe: true,
  fog: false,
})

const gemMat = new THREE.MeshPhongMaterial({
  color: new THREE.Color(0x000000),
  emissive: new THREE.Color(0x000000),
  specular: new THREE.Color(0x256351),
})

const textureLoader = new THREE.TextureLoader()

const isGem = obj => {
  return obj.name.includes('eye') || obj.name.includes('orb')
}

const updateMats = (model, mat) => {
  model.children.forEach(obj => {
    if (!isGem(obj)) {
      obj.material = mat
    }
  })
}

const flicker = (obj, mat1, mat2, perm) => {
  let numFlicks = 8

  const f = () => {
    const t = 10 + Math.random() * 50
    setTimeout(() => {
      obj.material = numFlicks % 2 ? mat1 : mat2

      if (numFlicks > -1) {
        f()
        numFlicks--
      } else {
        obj.material = perm ? mat1 : mat2
      }
    }, t)
  }

  f()
}

export class MultiFace {
  constructor () {
    this.root = new THREE.Group()
    this.centerPoint = new THREE.Vector3(0, 0, 0)

    this.eyeMat = gemMat
    this.mainMat = stoneMat

    this.zRange = -400

    const bumpMap = textureLoader.load(bumpUrl)
    bumpMap.matrixAutoUpdate = false
    stoneMat.bumpMap = bumpMap

    const loader = new GLTFLoader()
    loader.load(gltfUrl, (object) => {
      this.model = object.scene.getObjectByName('Head')
      this.model.rotation.x -= Math.PI / 2

      this.pieces = []
      this.mainPieces = []
      this.thirdEye = this.model.getObjectByName('orb')

      updateMats(this.model, stoneMat)

      for (let i = this.model.children.length - 1; i > -1; i--) {
        const obj = this.model.children[i]

        if (isGem(obj)) {
          obj.material = gemMat
        } else {
          this.mainPieces.push(obj)
        }
        this.root.attach(obj)
        this.pieces.push(obj)

        obj.originalPos = obj.position.clone()
        obj.originalRot = obj.rotation.clone()
        obj.wildPos = new THREE.Vector3()
        obj.wildRot = new THREE.Vector3()
        obj.basePos = new THREE.Vector3()
        obj.rotPos = new THREE.Vector3()
        obj.orbitSpd = new THREE.Vector3(
          Math.random(),
          Math.random(),
          Math.random(),
        )
        obj.orbitRad = new THREE.Vector3(
          Math.random(),
          Math.random(),
          Math.random(),
        )
      }
    })

    this.props = {
      pieceRotX: 0,
      pieceRotY: 0,
      pieceRotZ: 0,
      rotX: 0,
      rotY: 0,
      rotZ: 0,
    }

    this.rotX = 0
    this.rotY = 0
    this.rotZ = 0
    this.shiftZ = 0
    this.shiftZTick = 0
    this.shiftScaleTick = 0
    this.tweening = false
  }

  resetPieces (p, xOffset = 0, yOffset = 0, zOffset = 0) {
    this.tweening = true
    this.props.pieceRotX = (this.props.pieceRotX % PI2)
    this.props.pieceRotY = PI2 + (this.props.pieceRotY % PI2)
    this.props.pieceRotZ = PI2 + (this.props.pieceRotZ % PI2)

    new TWEEN.Tween(this.props)
      .to({
        pieceRotX: xOffset,
        pieceRotY: yOffset,
        pieceRotZ: zOffset,
      }, p.tweenTime * 5000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => {
        this.tweening = false
      })
  }

  faceFront (p) {
    this.spin(p, 0, 0, 0)
  }

  spinY (p) {
    this.spin(p, undefined, this.props.rotY + 1)
  }

  changeMat (r = 0.5, flickerPerm) {
    this.mainPieces.forEach(obj => {
      if (Math.random() > r) {
        flicker(obj, wireframeMat, stoneMat, flickerPerm)
      }
    })
  }

  glitch () {
    this.changeMat()
  }

  glitchPerm () {
    this.changeMat(0.2, true)
  }

  resetGlitch () {
    this.changeMat(0)
  }

  spin (p, x, y, z) {
    this.tweening = true

    this.props.rotX %= 1
    this.props.rotY %= 1
    this.props.rotZ %= 1

    this.tweening = true

    if (this.spinTween) {
      TWEEN.remove(this.spinTween)
    }

    const to = {}

    if (x !== undefined) { to.rotX = x }
    if (y !== undefined) { to.rotY = y }
    if (z !== undefined) { to.rotZ = z }

    this.spinTween = new TWEEN.Tween(this.props)
      .to(to, p.tweenTime * 5000)
      .easing(TWEEN.Easing.Exponential.Out)
      .start()
      .onComplete(() => {
        this.tweening = false

        this.props.rotX %= 1
        this.props.rotY %= 1
        this.props.rotZ %= 1
      })
  }

  randomize (p) {
    const offsets = [
      [PI2 / 2, PI2 / 2, 0],
      [0, PI2 / 2, 0],
      [0, 0, PI2 / 2],
      [PI2 / 4, 0, PI2 / 2],
      [PI2 / 2, 0, 0],
    ]

    const getOffset = () => {
      let i

      while (!i || i === this.lastRandomIndex) {
        i = Math.floor(Math.random() * 4)
      }

      this.lastRandomIndex = i

      return offsets[i]
    }

    this.resetPieces(p, ...getOffset())
  }

  moveToPoint (point) {
    const offset = new THREE.Vector3()
    const newPoint = new THREE.Vector3()

    this.pieces.forEach((obj, i) => {
      const { x, y, z } = newPoint.addVectors(
        point,
        obj.originalPos,
      )

      new TWEEN.Tween(obj.basePos)
        .to({
          x, y, z,
        }, Math.random() * 2000 + 500)
        .easing(TWEEN.Easing.Back.InOut)
        .delay(Math.random() * 300)
        .start()
    })

    this.centerPoint.copy(point)
  }

  update (p, d, t) {
    if (!this.model) return

    const orbitSpd = 3
    const rotSpd = Math.abs(mouse.y) * 3

    this.pieces.forEach((obj, i) => {
      obj.rotPos.set(
        Math.sin(t * obj.orbitSpd.x * orbitSpd + i) * obj.orbitRad.x,
        Math.cos(t * obj.orbitSpd.y * orbitSpd + i) * obj.orbitRad.y,
        Math.cos(t * obj.orbitSpd.z * orbitSpd + i) * obj.orbitRad.z,
      )

      obj.rotation.x += 0.03 * rotSpd
      obj.rotation.x += 0.06 * rotSpd

      obj.wildPos.lerpVectors(obj.rotPos, obj.originalPos, (1 - Math.abs(mouse.x)))
      obj.position.addVectors(obj.wildPos, obj.basePos)
    })

    // this.shiftZTick += p.shiftZSpeed / 5 * f
    // this.shiftScaleTick += 0.3 * p.scaleSpeed * f

    // if (!this.tweening) {
    //   this.props.pieceRotX += (p.pieceRotSpeedX * 0.5 * f)
    //   this.props.pieceRotY += (p.pieceRotSpeedY * 0.5 * f)
    //   this.props.pieceRotZ += (p.pieceRotSpeedZ * 0.5 * f)
    // }
    // if (p.basePieceScale !== undefined && this.pieces !== undefined) {
    //   this.pieces.forEach((obj, i) => {
    //     let s = p.basePieceScale + Math.max(Math.abs(Math.sin((this.shiftScaleTick + i))) * p.pieceScale * 5, 0.001)
    //     // obj.position.z = obj.originalPosition.z + (Math.sin(this.shiftZTick + i) * p.shiftZ * 3)
    //     // obj.position.x = obj.originalPosition.x + obj.vx * 2 * p.shiftX
    //     // obj.position.y = obj.originalPosition.y + obj.vy * 2 * p.shiftY
    //     if (!isGem(obj)) {
    //       obj.rotation.x = this.props.pieceRotX
    //       obj.rotation.y = this.props.pieceRotY
    //       obj.rotation.z = this.props.pieceRotZ
    //       obj.scale.set(s, s, s)
    //     } else if (obj.name === 'orb' && p.orbScale !== undefined) {
    //       s = Math.max(p.orbScale, 0.001)
    //       obj.scale.set(s, s, s)
    //     } else if (obj.name === 'eye' && p.eyeScale0 !== undefined) {
    //       s = Math.max(p.eyeScale0, 0.001)
    //       obj.scale.set(s, s, s)
    //     } else if (obj.name === 'eye001' && p.eyeScale1 !== undefined) {
    //       s = Math.max(p.eyeScale1, 0.001)
    //       obj.scale.set(s, s, s)
    //     }
    //   })
    // }

    // const shakeX = (Math.random() * 2 - 1) * p.shakeAmp
    // const shakeY = (Math.random() * 2 - 1) * p.shakeAmp

    // if (p.shakeAmp !== undefined) {
    //   this.group.position.x = shakeX
    //   this.group.position.y = shakeY
    // }

    // if (p.modelScale !== undefined) {
    //   const s = Math.max(p.modelScale, 0.001)
    //   this.group.scale.set(s, s, s)
    // }

    // if (p.posZ !== undefined) this.group.position.z = p.posZ * this.zRange

    // if (p.rotSpeedX !== undefined) this.props.rotX += p.rotSpeedX * 0.03
    // if (p.rotSpeedY !== undefined) this.props.rotY += p.rotSpeedY * 0.03
    // if (p.rotSpeedZ !== undefined) this.props.rotZ += p.rotSpeedZ * 0.03

    // this.group.rotation.x = this.props.rotX * PI2
    // this.group.rotation.y = this.props.rotY * PI2
    // this.group.rotation.z = this.props.rotZ * PI2
  }
}
