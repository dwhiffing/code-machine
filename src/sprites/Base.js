let id = 0
export class Base {
  constructor(scene, sprite, key, type = 'base') {
    this.key = key || `${type}-${id++}`
    this.scene = scene
    this.selected = false
    this.disabled = false
    this.hovered = false
    this.sprite = sprite
    sprite._parent = this
    this._value = 0

    sprite.on('pointerout', () => this.onHover(false))
    sprite.on('pointerover', () => this.onHover(true))
    sprite.on('pointerup', this.onPress)

    this.text = scene.add
      .text(sprite.x, sprite.y, this.key.replace(/Positive|Negative/, ''), {
        align: 'center',
        fontSize: 11,
      })
      .setOrigin(0.5)
      .setAlpha(scene.mode)

    this.text.setDepth(2)

    sprite.children = [this.text]

    this.onHover(false)
  }

  get value() {
    return this._value
  }
  set value(v) {
    if (v !== this._value) {
      this._value = v
      this.updateHighlight()
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
    this.updateHighlight()
  }

  updateHighlight = () => {
    this.text.setStroke('#000000', 4)
    if (this.selected || this.placing) {
      this.highlight()
    } else {
      this.unhighlight()
    }
    if (!this.selected && this.hovered) {
      this.hoverHighlight()
    }
  }

  highlight = () => (this.sprite.fillColor = this.value ? 0xaaaa00 : 0x555555)

  unhighlight = () => (this.sprite.fillColor = this.value ? 0x555500 : 0x333333)

  hoverHighlight = () =>
    (this.sprite.fillColor = this.value ? 0x999900 : 0x444444)

  destroy() {
    this.sprite.destroy()
    this.text.destroy()
  }
}
