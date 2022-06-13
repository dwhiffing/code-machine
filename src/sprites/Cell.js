import { createGlow, createBulb } from '../services/led'
import { Base } from './Base'

const size = 50
export class Cell extends Base {
  constructor(scene, x = 0, y = 0, type) {
    const bulbKey = scene.drawCanvas(createBulb(size), size)
    const sprite = scene.add.image(x, y, bulbKey)
    const shape = new Phaser.Geom.Circle(size * 1.5, size * 1.5, size / 2)
    sprite.setInteractive(shape, Phaser.Geom.Circle.Contains)
    scene.input.setDraggable(sprite)
    super(scene, sprite, type)
  }

  highlight = () => this.sprite.setTint?.(0xffffff)

  unhighlight = () => this.sprite.setTint?.(0x999999)

  hoverHighlight = () => this.sprite.setTint?.(0xcccccc)

  drawGlow = (size, value) => {
    const glow = createGlow(value ? 0 : 1, value ? 1 : 0, 0, size * 2)
    const glowKey = this.scene.drawCanvas(glow, size * 2)
    this.glow = this.scene.add.image(this.sprite.x, this.sprite.y, glowKey)
    this.sprite.children = [this.glow, this.text]
  }

  toggle = () => this.glow.setAlpha(this.glow.alpha ? 0 : 1)

  destroy() {
    super.destroy()
    this.glow.destroy()
  }
}
export class PositiveCell extends Cell {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y, 'PositiveCell')

    this.drawGlow(size, 1)
  }
}
export class NegativeCell extends Cell {
  constructor(scene, x = 0, y = 0) {
    super(scene, x, y, 'NegativeCell')

    this.drawGlow(size, 0)
  }
}
