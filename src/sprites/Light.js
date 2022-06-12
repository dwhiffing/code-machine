import { createGlow, createBulb } from '../services/led'
import { Base } from './Base'

const size = 100
export class Light extends Base {
  constructor(scene, x = 0, y = 0) {
    const bulbKey = scene.drawCanvas(createBulb(size), size)
    const sprite = scene.add.image(x, y, bulbKey)
    const shape = new Phaser.Geom.Circle(size * 1.5, size * 1.5, size / 2)
    sprite.setInteractive(shape, Phaser.Geom.Circle.Contains)
    scene.input.setDraggable(sprite)
    super(scene, sprite, 'Light')

    this.drawGlow(size)
  }

  highlight = () => this.sprite.setTint?.(0xffffff)

  unhighlight = () => this.sprite.setTint?.(0x999999)

  hoverHighlight = () => this.sprite.setTint?.(0xcccccc)

  get value() {
    return super.value
  }

  set value(v) {
    if (this._value !== v) this.toggle()
    this._value = v
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
