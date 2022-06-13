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

  cloneSelectedNodes = () => {
    this.cloneStart = {
      x: this.scene.input.activePointer.x,
      y: this.scene.input.activePointer.y,
    }
    const nodes = this.scene.getSelectedNodes()
    const wires = this.scene
      .getEntities()
      .filter((e) => e.selected && e.key.match(/Wire/))
      .map((e) => [e.input.key, e.output.key])

    const map = {}
    this.scene.deselect()
    nodes.forEach((n) => {
      const node = new SPRITES[n.key.split('-')[0]](this.scene, n.x, n.y)
      node.placing = true
      this.nodes.push(node)
      map[n.key] = node.key
    })

    wires.forEach(([inKey, outKey]) => {
      const nodeA = this.nodes.find((n) => n.key === map[inKey])
      const nodeB = this.nodes.find((n) => n.key === map[outKey])
      this.scene.wireService.connect(nodeA, nodeB)
    })
    this.updatePosMap()
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
        if (node.key.match(/Wire/)) {
          this.scene.wireService.disconnect(node)
        } else {
          this.scene.wireService.disconnect(node)
          const nodes = this.nodes.filter((w) =>
            w.key.match(new RegExp(node.key)),
          )
          this.nodes = this.nodes.filter(
            (w) => !nodes.some((c) => c.key === w.key),
          )
          nodes.forEach((w) => w.destroy())
        }
      })
  }

  onPointerMove = (p) => {
    const nodes = this.scene.getEntities().filter((p) => p.placing)
    if (nodes.length > 0) {
      this.moveNodes(
        nodes,
        p.x - this.cloneStart?.x ?? 0,
        p.y - this.cloneStart?.y ?? 0,
      )
    }
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

  updatePosMap = () => {
    // store original position of selected objects for dragging
    this.posMap = this.scene
      .getEntities()
      .reduce((obj, e) => ({ ...obj, [e.key]: { x: e.x, y: e.y } }), {})
  }

  moveNodes = (nodes, diffX, diffY) => {
    // move all objects based on their position before draggin
    nodes.forEach((e) => {
      const posX = this.posMap[e.key]?.x + diffX
      const posY = this.posMap[e.key]?.y + diffY
      e.sprite.setPosition(posX, posY)
      e.sprite.children?.forEach((c) => c.setPosition(posX, posY))
    })
  }
}
