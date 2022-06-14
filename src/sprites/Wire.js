import { Base } from './Base'

const { Angle, Distance, RadToDeg } = Phaser.Math
const OFFSET = Math.PI / 2

export class Wire extends Base {
  constructor(scene, input, output, key) {
    const dist = Distance.BetweenPoints(input, output)
    const sprite = scene.add.rectangle(0, 0, 10, dist, 0x333333)
    sprite.setInteractive()
    super(scene, sprite, key, 'Wire')
    this.key = `Wire-${input.key}:${output.key}`
    this.scene = scene
    this.input = input
    this.output = output
    this.sprite.setDepth(-1)
  }

  update() {
    const { x, y } = getMidPoint(this.input, this.output)
    const distance = Distance.BetweenPoints(this.input, this.output)
    this.sprite.setPosition(x, y)
    this.text.setPosition(x, y)

    this.sprite.displayHeight = distance

    const angle = Angle.BetweenPoints(this.output, this.input)
    this.sprite.angle = RadToDeg(Angle.Normalize(angle - OFFSET))
  }
}

const getMidPoint = (a, b) => ({
  x: a.x + (b.x - a.x) / 2,
  y: a.y + (b.y - a.y) / 2,
})
