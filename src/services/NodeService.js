import { NegativeCell, PositiveCell } from '../sprites/Cell'
import { Light } from '../sprites/Light'
import { Magnet } from '../sprites/Magnet'
import { Node } from '../sprites/Node'
import { Switch } from '../sprites/Switch'
const SPRITES = { Magnet, NegativeCell, PositiveCell, Light, Node, Switch }

export default class NodeService {
  constructor(scene) {
    this.scene = scene
    this.scene.input.on('pointermove', this.onPointerMove)
  }

  loadLevel = (level) => {
    this.nodes = level
      .filter((o) => !o.key.match(/^Wire/))
      .map((o) => new SPRITES[o.key.split('-')[0]](this.scene, o.x, o.y))

    level
      .filter((o) => o.key.match(/^Wire/))
      .forEach((o) =>
        this.scene.wireService.connect(
          this.nodes.find((n) => n.key === o.input),
          this.nodes.find((n) => n.key === o.output),
        ),
      )
  }

  placeNode = () => {
    const node = new Node(this.scene, 1200, 800)
    node.placing = true
    node.sprite.setPosition(this.scene.input.activePointer)
    this.nodes.push(node)
  }

  connectSelectedNodes = () => {
    const children = this.scene
      .getEntities()
      .filter((w) => w.selected && !w.key.match(/^Wire/))
    if (children.length === 2) {
      this.scene.wireService.connect(...children)
      children.forEach((c) => c.toggleSelect(false))
    }
  }

  deleteSelectedNodes = () => {
    this.scene
      .getEntities()
      .filter((node) => node.selected)
      .forEach((node) => {
        const nodes = this.nodes.filter((w) =>
          w.key.match(new RegExp(node.key)),
        )
        this.nodes = this.nodes.filter(
          (w) => !nodes.some((c) => c.key === w.key),
        )
        if (!node.key.match(/Wire/)) this.scene.wireService.disconnect(node)
        nodes.forEach((w) => w.destroy())
      })
  }

  onPointerMove = (p) => {
    const nodes = this.scene.getEntities().filter((p) => p.placing)
    nodes.forEach((n) => n.sprite.setPosition(p.worldX, p.worldY))
  }

  exportLevelToClipboard = () => {
    const exported = this.scene.getEntities().map((c) => {
      let e = { key: c.key }
      if (e.key.match(/^Wire/)) {
        return { ...e, input: c.input.key, output: c.output.key }
      } else {
        return { ...e, x: Math.round(c.x), y: Math.round(c.y) }
      }
    })
    navigator.clipboard.writeText(JSON.stringify(exported))
    console.log('copied level')
  }
}
