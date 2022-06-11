import { createGlow, createLedSprite } from '../services/led'
import WireService from '../services/WireService'

class Light {
  constructor(scene, x = 0, y = 0, size = 100) {
    const bulbKey = 'bulb' + Date.now()
    const bulbCanvas = scene.textures.createCanvas(bulbKey, size * 3, size * 3)
    bulbCanvas.context.drawImage(createLedSprite(size), size, size)
    bulbCanvas.refresh()
    this.bulbSprite = scene.add.image(x, y, bulbKey)

    const glowKey = 'glow' + Date.now()
    const glowCanvas = scene.textures.createCanvas(glowKey, size * 3, size * 3)
    glowCanvas.context.drawImage(createGlow(1, 1, 0, size * 3), 0, 0)
    glowCanvas.refresh()
    this.glowSprite = scene.add.image(x, y, glowKey)

    this.bulbSprite.setInteractive()
    scene.input.setDraggable(this.bulbSprite)

    scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY
      this.glowSprite.x = dragX
      this.glowSprite.y = dragY
    })

    scene.time.addEvent({
      delay: 1000,
      callback: this.toggle,
      callbackScope: this,
      loop: true,
    })
  }

  toggle() {
    this.glowSprite.setAlpha(this.glowSprite.alpha ? 0 : 1)
  }
}
export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  init() {
    this.width = this.cameras.main.width
    this.height = this.cameras.main.height
  }

  create() {
    this.nodes = []
    const light = new Light(this, 200, 200)
    const light2 = new Light(this, 500, 500)
    this.nodes.push(light)
    this.nodes.push(light2)
    const wireServices = new WireService(this)
    // this.input.keyboard.on('keyup', (e) => {
    //   if (e.key === 'x') {
    //     this.won()
    //   }
    // })

    // this.input.on('pointerdown', (p) => {
    //   this.trashService.putTrash(p.x)
    // })

    // this.scene.launch('Hud')
  }

  update() {}
}
