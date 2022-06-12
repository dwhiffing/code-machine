import { createGlow, createLedSprite } from '../services/led'

export class Light {
  constructor(scene, x = 0, y = 0, size = 100) {
    this.scene = scene
    const bulbKey = 'bulb' + Date.now()
    const bulbCanvas = scene.textures.createCanvas(bulbKey, size * 3, size * 3)
    bulbCanvas.context.drawImage(createLedSprite(size), size, size)
    bulbCanvas.refresh()
    this.bulb = scene.add.image(x, y, bulbKey)

    const glowKey = 'glow' + Date.now()
    const glowCanvas = scene.textures.createCanvas(glowKey, size * 3, size * 3)
    glowCanvas.context.drawImage(createGlow(1, 1, 0, size * 3), 0, 0)
    glowCanvas.refresh()
    this.glow = scene.add.image(x, y, glowKey)
    this.glow.setAlpha(0)
    this.bulb.glow = this.glow
    var shape = new Phaser.Geom.Circle(size * 1.5, size * 1.5, size / 2)
    this.bulb.setInteractive(shape, Phaser.Geom.Circle.Contains)
    scene.input.setDraggable(this.bulb)
    this.selected = false
    this.hovered = false
    this.bulb.setTint(0x999999)

    this.bulb.on('pointerout', () => {
      this.hovered = false
      this.toggleSelect(this.selected)
    })
    this.bulb.on('pointerover', () => {
      this.hovered = true
      this.toggleSelect(this.selected)
    })

    this.bulb.on('pointerup', (e) => {
      const offset = Math.abs(e.downX - e.upX) + Math.abs(e.downY - e.upY)
      if (offset !== 0) return
      this.toggleSelect()
    })

    scene.input.on('drag', (_, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY
      gameObject.glow.x = dragX
      gameObject.glow.y = dragY
    })
  }

  get x() {
    return this.bulb.x
  }
  get y() {
    return this.bulb.y
  }

  toggleSelect = (_selected) => {
    let status = typeof _selected === 'undefined' ? !this.selected : _selected
    this.selected = status
    if (this.selected || this.hovered) {
      this.bulb.setTint(this.selected ? 0xffffff : 0xcccccc)
    } else {
      this.bulb.setTint(0x999999)
    }
  }

  toggle() {
    this.glow.setAlpha(this.glow.alpha ? 0 : 1)
  }

  destroy() {
    this.scene.wireService.wires
      .filter((w) => w.input === this || w.output === this)
      .forEach((w) => w.destroy())
    this.bulb.destroy()
    this.glow.destroy()
  }
}
