import { Base } from './Base'

export class Node extends Base {
  constructor(scene, x = 0, y = 0, key) {
    const sprite = scene.add.rectangle(x, y, 30, 30, 0x333333)
    sprite.setInteractive()
    scene.input.setDraggable(sprite)
    super(scene, sprite, key, 'Node')
  }
}
