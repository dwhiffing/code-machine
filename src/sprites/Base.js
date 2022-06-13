let id = 0
export class Base {
  constructor(scene, sprite, type = 'base') {
    this.key = `${type}-${id++}`
    this.scene = scene
    this.selected = false
    this.disabled = false
    this.hovered = false
    this.sprite = sprite
    this._value = 0

    sprite.on('pointerout', () => this.onHover(false))
    sprite.on('pointerover', () => this.onHover(true))
    sprite.on('pointerup', this.onPress)

    this.text = scene.add
      .text(sprite.x, sprite.y, this.key, { align: 'center' })
      .setOrigin(0.5, 1)
      .setAlpha(scene.mode)

    sprite.children = [this.text]

    this.onHover(false)
  }

  get value() {
    return this._value
  }
  set value(v) {
    if (v !== this._value) {
      this._value = v
      this.unhighlight()
      if (this.hovered) this.hoverHighlight()
    }
  }

  get x() {
    return this.sprite.x
  }
  get y() {
    return this.sprite.y
  }

  set x(value) {
    this.sprite.x = value
  }
  set y(value) {
    this.sprite.y = value
  }

  onPress = (e) => {
    if (this.placing) {
      this.placing = false
      return
    }

    const offset = Math.abs(e.downX - e.upX) + Math.abs(e.downY - e.upY)
    if (offset !== 0) return

    if (this.scene.mode === 0) {
      this.interact()
    } else {
      this.toggleSelect()
    }
  }

  interact = () => {}
  onHover = (isOver = true) => {
    this.hovered = isOver
    if (this.hovered) this.hoverHighlight()
    else this.unhighlight()
    this.toggleSelect(this.selected)
  }

  toggleSelect = (_selected) => {
    let status = typeof _selected === 'undefined' ? !this.selected : _selected
    this.selected = status
    if (this.selected || this.placing) {
      this.highlight()
    } else {
      this.unhighlight()
    }
    if (!this.selected && this.hovered) this.hoverHighlight()
  }

  highlight = () => (this.sprite.fillColor = this.value ? 0xaaaa00 : 0xaaaaaa)

  unhighlight = () => (this.sprite.fillColor = this.value ? 0x555500 : 0x333333)

  hoverHighlight = () =>
    (this.sprite.fillColor = this.value ? 0x999900 : 0x666666)

  destroy() {
    this.sprite.destroy()
    this.text.destroy()
  }
}
