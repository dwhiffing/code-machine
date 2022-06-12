import { Base } from './Base'

export class Switch extends Base {
  constructor(scene, x = 0, y = 0) {
    const sprite = scene.add.circle(x, y, 50, 0x333333)
    sprite.setInteractive()
    scene.input.setDraggable(sprite)
    super(scene, sprite, 'Switch')
    this.value = 1
  }

  interact = () => {
    this.value = this.value ? 0 : 1
    this.scene.wireService.checkPower()
  }
}
