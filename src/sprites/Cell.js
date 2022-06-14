import { createGlow, createBulb, drawCanvas } from '../services/led'
import { Base } from './Base'

const size = 70
export class Cell extends Base {
  constructor(scene, x = 0, y = 0, key, type = 'Cell') {
    const bulbKey = drawCanvas(scene, createBulb(size), size)
    const sprite = scene.add.image(x, y, bulbKey)
    const shape = new Phaser.Geom.Circle(size * 1.5, size * 1.5, size / 2)
    sprite.setInteractive(shape, Phaser.Geom.Circle.Contains)
    scene.input.setDraggable(sprite)
    super(scene, sprite, key, type)
    this.drawGlow(size)
    this.polarity = 1
  }

  get polarity() {
    return this._polarity
  }

  set polarity(v) {
    this._polarity = v
    this.glow.setAlpha(v === 1 ? 1 : 0)
    this.glowRed.setAlpha(v === 1 ? 0 : 1)
  }

  highlight = () => {
    this.sprite.setTint?.(0xffffff)
    this.glow.setScale(1.4)
    this.glowRed.setScale(1.4)
  }

  unhighlight = () => {
    this.sprite.setTint?.(0x999999)
    this.glow.setScale(1)
    this.glowRed.setScale(1)
  }

  hoverHighlight = () => {
    this.sprite.setTint?.(0xcccccc)
    this.glow.setScale(1.15)
    this.glowRed.setScale(1.15)
  }

  drawGlow = (size) => {
    const glow = createGlow(0, 1, 0, size * 2)
    const glowKey = drawCanvas(this.scene, glow, size * 2)
    this.glow = this.scene.add.image(this.sprite.x, this.sprite.y, glowKey)
    const glowRed = createGlow(1, 0, 0, size * 2)
    const glow2Key = drawCanvas(this.scene, glowRed, size * 2)
    this.glowRed = this.scene.add.image(this.sprite.x, this.sprite.y, glow2Key)
    this.sprite.children = [this.glow, this.glowRed, this.text]
  }

  destroy() {
    super.destroy()
    this.glow.destroy()
    this.glowRed.destroy()
  }
}
