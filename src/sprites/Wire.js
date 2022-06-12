export class Wire {
  constructor(scene, nodeA, nodeB) {
    this.scene = scene
    this.nodeA = nodeA
    this.nodeB = nodeB
    const dist = Phaser.Math.Distance.BetweenPoints(
      this.nodeA.bulbSprite,
      this.nodeB.bulbSprite,
    )
    this.sprite = this.scene.add.rectangle(0, 0, 20, dist, 0xffffff)
    this.sprite.setDepth(-1)
    this.sprite.setInteractive()
  }

  update() {
    const nodeA = this.nodeA
    const nodeB = this.nodeB
    const diffX =
      nodeA.bulbSprite.x + (nodeB.bulbSprite.x - nodeA.bulbSprite.x) / 2
    const diffY =
      nodeA.bulbSprite.y + (nodeB.bulbSprite.y - nodeA.bulbSprite.y) / 2
    const dist = Phaser.Math.Distance.BetweenPoints(
      nodeA.bulbSprite,
      nodeB.bulbSprite,
    )
    const angle = Phaser.Math.Angle.BetweenPoints(
      nodeB.bulbSprite,
      nodeA.bulbSprite,
    )
    this.sprite.setPosition(diffX, diffY)
    this.sprite.displayHeight = dist
    this.sprite.angle = Phaser.Math.RadToDeg(
      Phaser.Math.Angle.Normalize(angle - Math.PI / 2),
    )
  }
}
