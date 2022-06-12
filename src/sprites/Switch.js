import { Base } from './Base'

export class Switch extends Base {
  constructor(scene, x = 0, y = 0) {
    const sprite = scene.add.circle(x, y, 50, 0x333333)
    sprite.setInteractive()
    scene.input.setDraggable(sprite)
    super(scene, sprite, 'Switch')
    this.value = 1
  }

  highlight = () => (this.sprite.fillColor = 0xaaaaaa)

  unhighlight = () => (this.sprite.fillColor = 0x333333)

  hoverHighlight = () => (this.sprite.fillColor = 0x666666)
}
