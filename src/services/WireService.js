import { Wire } from '../sprites/Wire'
import { allSimplePaths } from 'graphology-simple-path'
import Graph from 'graphology'

export default class WireService {
  constructor(scene) {
    this.scene = scene
    this.wires = []
  }

  update() {
    this.wires.forEach((e) => e.update())
  }

  connect = (nodeA, nodeB) => {
    const wire = new Wire(this.scene, nodeA, nodeB)
    this.wires.push(wire)
    this.checkPower()
  }

  disconnect = (node) => {
    const key = node.key
    const wires = this.wires.filter((w) => w.key.match(new RegExp(key)))
    this.wires = this.wires.filter((w) => !wires.some((c) => c.key === w.key))
    wires.forEach((w) => w.destroy())
    this.checkPower()
  }

  checkPower = () => {
    // reset power state of everything but switches
    // TODO: should have a generic property for that (maybe interactable?)
    const entities = this.scene.getChildren()
    entities.forEach((e) => !e?.key.match(/^Switch/) && (e.value = 0))

    // create graph of nodes/wires
    const graph = new Graph({ type: 'undirected' })
    this.scene.nodes.forEach((e) => {
      if (e.key.match(/Switch/) && e.value !== 1) return
      graph.addNode(e.key)
    })
    this.wires.forEach((e) => {
      if (graph.hasNode(e.input.key) && graph.hasNode(e.output.key)) {
        graph.addEdge(e.output.key, e.input.key)
      }
    })

    const start = entities.find((e) => e.key.match(/NegativeCell/))
    const end = entities.find((e) => e.key.match(/PositiveCell/))
    if (!start || !end) return

    // power all paths from negative cell to positive cell
    allSimplePaths(graph, start.key, end.key).forEach((_path) => {
      if (!_path) return
      const path = _path?.map((k) => entities.find((e) => e.key === k)) || []
      path.forEach((node, i) => {
        if (i === 0) return
        // all nodes/wires on a path are considered powered
        const a = `Wire-${path[i - 1].key}:${node.key}`
        const b = `Wire-${node.key}:${path[i - 1].key}`
        const wire = entities.find((e) => e.key === a || e.key === b)
        if (wire) wire.value = 1
        if (!node.key.match(/Switch|Cell/)) {
          node.value = 1
        }
      })
    })
  }
}
