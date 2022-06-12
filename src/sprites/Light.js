import { createGlow, createBulb } from '../services/led'
import { Base } from './Base'

export class Light extends Base {
  constructor(scene, x = 0, y = 0, size = 100) {
    const bulbKey = scene.drawCanvas(createBulb(size), size)
    const sprite = scene.add.image(x, y, bulbKey)
    const shape = new Phaser.Geom.Circle(size * 1.5, size * 1.5, size / 2)
    sprite.setInteractive(shape, Phaser.Geom.Circle.Contains)
    scene.input.setDraggable(sprite)
    super(scene, sprite)

    this.drawGlow(size)
  }

  drawGlow = (size) => {
    const glow = createGlow(1, 1, 0, size * 3)
    const glowKey = this.scene.drawCanvas(glow, size * 3)
    this.glow = this.scene.add
      .image(this.sprite.x, this.sprite.y, glowKey)
      .setAlpha(0)
    this.sprite.children = [this.glow]
  }

  toggle = () => this.glow.setAlpha(this.glow.alpha ? 0 : 1)

  destroy() {
    super.destroy()
    this.glow.destroy()
  }
}
