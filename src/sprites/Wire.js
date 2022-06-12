export class Wire {
  constructor(scene, input, output) {
    this.scene = scene
    this.input = input
    this.output = output
    this.selected = false
    const dist = Phaser.Math.Distance.BetweenPoints(this.input, this.output)
    this.sprite = this.scene.add.rectangle(0, 0, 10, dist, 0x333333)
    this.sprite.setDepth(-1)
    this.sprite.setInteractive()

    this.sprite.on('pointerout', () => {
      this.hovered = false
      this.toggleSelect(this.selected)
    })
    this.sprite.on('pointerover', () => {
      this.hovered = true
      this.toggleSelect(this.selected)
    })
    this.sprite.on('pointerup', () => this.toggleSelect())
  }

  toggleSelect(_status) {
    let status = typeof _status === 'undefined' ? !this.selected : _status
    this.selected = status
    this.sprite.fillColor = this.selected
      ? 0xaaaaaa
      : this.hovered
      ? 0x666666
      : 0x333333
  }

  update() {
    const diffX = this.input.x + (this.output.x - this.input.x) / 2
    const diffY = this.input.y + (this.output.y - this.input.y) / 2
    this.sprite.setPosition(diffX, diffY)

    const dist = Phaser.Math.Distance.BetweenPoints(this.input, this.output)
    this.sprite.displayHeight = dist

    const angle = Phaser.Math.Angle.BetweenPoints(this.output, this.input)
    const rad = Phaser.Math.Angle.Normalize(angle - Math.PI / 2)
    this.sprite.angle = Phaser.Math.RadToDeg(rad)
  }

  destroy() {
    this.sprite.destroy()
  }
}
