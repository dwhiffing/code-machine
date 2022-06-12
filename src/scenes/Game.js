import { LEVEL } from '../constants'
import WireService from '../services/WireService'
import { NegativeCell, PositiveCell } from '../sprites/Cell'
import { Light } from '../sprites/Light'
import { Node } from '../sprites/Node'
import { Switch } from '../sprites/Switch'
const SPRITES = { NegativeCell, PositiveCell, Light, Node, Switch }

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  init() {}

  create() {
    this.mode = 0
    this.nodes = LEVEL.filter((o) => !o.key.match(/^Wire/)).map(
      (o) => new SPRITES[o.key.split('-')[0]](this, o.x, o.y),
    )

    this.input.on('drag', (_, object, x, y) => {
      if (this.mode === 1) {
        object.setPosition(x, y)
        object.children?.forEach((c) => c.setPosition(x, y))
      }
    })

    this.wireService = new WireService(this)

    LEVEL.filter((o) => o.key.match(/^Wire/)).forEach((o) =>
      this.wireService.connect(
        this.nodes.find((n) => n.key === o.input),
        this.nodes.find((n) => n.key === o.output),
      ),
    )

    this.input.on('pointerdown', (p, objects) => {
      if (objects.length === 0)
        this.getChildren().forEach((w) => w.toggleSelect(false))
    })

    this.input.on('pointermove', (p) => {
      const nodes = this.getChildren().filter((p) => p.placing)
      nodes.forEach((n) => n.sprite.setPosition(p.x, p.y))
    })

    this.input.keyboard.on('keyup', (e) => {
      if (e.key === 'Backspace') {
        this.getChildren()
          .filter((w) => w.selected)
          .forEach((s) => this.removeNode(s.key))
      }
      if (e.key === '3') {
        const exported = this.getChildren().map((c) => {
          let e = { key: c.key }
          if (e.key.match(/^Wire/)) {
            return { ...e, input: c.input.key, output: c.output.key }
          } else {
            return { ...e, x: Math.round(c.x), y: Math.round(c.y) }
          }
        })
        navigator.clipboard.writeText(JSON.stringify(exported))
      }
      if (e.key === '1') {
        const node = new Node(this, 1200, 800)
        node.placing = true
        node.sprite.setPosition(this.input.activePointer)
        this.nodes.push(node)
      }
      if (e.key === '2') {
        const children = this.getChildren().filter((w) => w.selected)
        if (children.length === 2) {
          this.wireService.connect(...children)
          children.forEach((c) => c.toggleSelect(false))
        }
      }
      if (e.key === '4') {
        this.mode = this.mode ? 0 : 1
      }
    })
  }

  getChildren = () => [...this.nodes, ...this.wireService.wires]

  removeNode = (key) => {
    const nodes = this.nodes.filter((w) => w.key.match(new RegExp(key)))
    this.nodes = this.nodes.filter((w) => !nodes.some((c) => c.key === w.key))
    this.wireService.removeWires(key)
    nodes.forEach((w) => w.destroy())
  }

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
