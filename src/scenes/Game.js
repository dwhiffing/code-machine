import WireService from '../services/WireService'
import { Light } from '../sprites/Light'
import { Node } from '../sprites/Node'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  init() {}

  create() {
    this.nodes = []
    const node = new Node(this, 200, 200)
    const node2 = new Node(this, 500, 500)
    const node3 = new Node(this, 700, 500)
    const node4 = new Light(this, 800, 800)
    this.nodes.push(node)
    this.nodes.push(node2)
    this.nodes.push(node3)
    this.nodes.push(node4)

    this.input.on('drag', (_, object, x, y) => {
      object.setPosition(x, y)
      object.children?.forEach((c) => c.setPosition(x, y))
    })

    this.wireService = new WireService(this)
    this.wireService.connect(node, node2)
    this.wireService.connect(node3, node4)
    this.wireService.connect(node, node3)
    this.wireService.connect(node4, node)

    this.input.on('pointerdown', (p, objects) => {
      if (objects.length === 0)
        this.getChildren().forEach((w) => w.toggleSelect(false))
    })

    this.input.on('pointermove', (p) => {
      const nodes = this.getChildren().filter((p) => p.placing)
      nodes.forEach((n) => n.bulb.setPosition(p.x, p.y))
    })

    this.input.keyboard.on('keyup', (e) => {
      if (e.key === 'Backspace') {
        this.getChildren()
          .filter((w) => w.selected)
          .forEach((s) => s.destroy())
      }
      if (e.key === '1') {
        const node = new Light(this, 1200, 800)
        const pointer = this.input.activePointer
        node.placing = true
        node.bulb.setPosition(pointer)
        this.nodes.push(node)
      }
      if (e.key === '2') {
        const children = this.getChildren().filter((w) => w.selected)
        if (children.length === 2) {
          this.wireService.connect(...children)
          children.forEach((c) => c.toggleSelect(false))
        }
      }
    })
  }

  getChildren = () => [...this.nodes, ...this.wireService.wires]

  update() {
    this.wireService.update()
  }

  drawCanvas(image, size) {
    const key = 'key' + Date.now()
    const canvas = this.textures.createCanvas(key, size * 3, size * 3)
    canvas.context.drawImage(image, size, size)
    canvas.refresh()
    return key
  }
}
