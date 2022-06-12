import { createGlow, createLedSprite } from '../services/led'

export class Light {
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
    this.glowSprite.setAlpha(0)
    this.bulbSprite.glowSprite = this.glowSprite

    this.bulbSprite.setInteractive()
    scene.input.setDraggable(this.bulbSprite)

    scene.input.on('drag', (_, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY
      gameObject.glowSprite.x = dragX
      gameObject.glowSprite.y = dragY
    })
  }

  toggle() {
    this.glowSprite.setAlpha(this.glowSprite.alpha ? 0 : 1)
  }
}
