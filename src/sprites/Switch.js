import { Base } from './Base'

export class Switch extends Base {
  constructor(scene, x = 0, y = 0, key) {
    const sprite = scene.add.circle(x, y, 50, 0x333333)
    sprite.setInteractive()
    scene.input.setDraggable(sprite)
    super(scene, sprite, key, 'Switch')
  }

  interact = () => {
    if (this.disabled) return
    this.value = this.value ? 0 : 1
  }
}
