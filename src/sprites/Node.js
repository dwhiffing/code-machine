import { Base } from './Base'

export class Node extends Base {
  constructor(scene, x = 0, y = 0) {
    const sprite = scene.add.rectangle(x, y, 50, 50, 0x333333)
    sprite.setInteractive()
    scene.input.setDraggable(sprite)
    super(scene, sprite, 'Node')
  }
}
