import { Base } from './Base'

export class Magnet extends Base {
  constructor(scene, x = 0, y = 0, key) {
    const sprite = scene.add.rectangle(x, y, 100, 100, 0x333333)
    sprite.setInteractive()
    scene.input.setDraggable(sprite)
    super(scene, sprite, key, 'Magnet')
    this.polarity = 1
  }

  get polarity() {
    return this._polarity
  }

  set polarity(v) {
    this._polarity = v
    const size = v === 1 ? 100 : 75
    this.sprite.setDisplaySize(size, size)
  }
}
