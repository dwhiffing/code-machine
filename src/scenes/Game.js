import WireService from '../services/WireService'
import { Light } from '../sprites/Light'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  init() {}

  create() {
    this.nodes = []
    const light = new Light(this, 200, 200)
    const light2 = new Light(this, 500, 500)
    const light3 = new Light(this, 700, 500)
    const light4 = new Light(this, 800, 800)
    this.nodes.push(light)
    this.nodes.push(light2)
    this.nodes.push(light3)
    this.nodes.push(light4)

    this.wireService = new WireService(this)
    this.wireService.connect(light, light2)
    this.wireService.connect(light3, light4)
    this.wireService.connect(light, light3)
    this.wireService.connect(light4, light)

    this.input.on('pointerdown', (p, objects) => {
      if (objects.length === 0)
        this.getChildren().forEach((w) => w.toggleSelect(false))
    })

    this.input.keyboard.on('keyup', (e) => {
      if (e.key === 'Backspace') {
        this.getChildren()
          .filter((w) => w.selected)
          .forEach((s) => s.destroy())
      }
    })
  }

  getChildren = () => [...this.nodes, ...this.wireService.wires]

  update() {
    this.wireService.update()
  }
}
