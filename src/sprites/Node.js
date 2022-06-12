import { Base } from './Base'

export class Node extends Base {
  constructor(scene, x = 0, y = 0) {
    const sprite = scene.add.rectangle(x, y, 50, 50, 0x333333)
    sprite.setInteractive()
    scene.input.setDraggable(sprite)
    super(scene, sprite, 'Node')
  }

  highlight = () => (this.sprite.fillColor = this.value ? 0xaaaa00 : 0xaaaaaa)

  unhighlight = () => (this.sprite.fillColor = this.value ? 0x333300 : 0x333333)

  hoverHighlight = () =>
    (this.sprite.fillColor = this.value ? 0x666600 : 0x666666)
}
