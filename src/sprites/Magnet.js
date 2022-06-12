import { Base } from './Base'

export class Magnet extends Base {
  constructor(scene, x = 0, y = 0) {
    const sprite = scene.add.rectangle(x, y, 100, 100, 0x333333)
    sprite.setInteractive()
    scene.input.setDraggable(sprite)
    super(scene, sprite, 'Magnet')
  }
}
