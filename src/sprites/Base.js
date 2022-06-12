let id = 0
export class Base {
  constructor(scene, sprite, type = 'base') {
    this.key = `${type}-${id++}`
    this.scene = scene
    this.selected = false
    this.sprite = sprite
    this._value = 0
    sprite.on('pointerout', () => this.onHover(false))
    sprite.on('pointerover', () => this.onHover(true))
    sprite.on('pointerup', this.onPress)
    this.onHover(false)
  }

  get value() {
    return this._value
  }
  set value(v) {
    if (v !== this.value) {
      this._value = v
      this.unhighlight()
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

    this.toggleSelect()
  }

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

  highlight = () => this.sprite.setTint?.(0xffffff)

  unhighlight = () => this.sprite.setTint?.(0x999999)

  hoverHighlight = () => this.sprite.setTint?.(0xcccccc)

  destroy() {
    this.scene.wireService.removeWires(this.key)
    this.sprite.destroy()
  }
}
