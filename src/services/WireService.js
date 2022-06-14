import { Wire } from '../sprites/Wire'
import { allSimplePaths } from 'graphology-simple-path'
import Graph from 'graphology'

export default class WireService {
  constructor(scene) {
    this.scene = scene
    this.wires = []
    this.scene.time.addEvent({
      delay: 250,
      repeat: -1,
      callback: this.checkPower,
    })
  }

  update() {
    this.wires.forEach((e) => e.update())
  }

  connect = (nodeA, nodeB) => {
    const wire = new Wire(this.scene, nodeA, nodeB)
    this.wires.push(wire)
  }

  disconnect = (node) => {
    let wires = this.wires.filter((w) => w.key.match(new RegExp(node.key)))
    this.wires = this.wires.filter((w) => !wires.some((c) => c.key === w.key))
    wires.forEach((w) => w.destroy())
  }

  checkPower = () => {
    // reset power state of everything but switches
    // TODO: should have a generic property for that (maybe interactable?)
    const entities = this.scene.getEntities()

    entities.forEach((e) => {
      e.disabled = false
      if (!e?.key.match(/^Switch/)) {
        e.value = 0
      }
    })

    // create graph of nodes/wires. Ignore closed switches
    const graph = new Graph({ type: 'undirected' })
    this.scene
      .getEntities()
      .filter((n) => !n.key.match(/Wire/))
      .forEach((e) => {
        if (e.key.match(/Switch/) && e.value !== 1) return
        graph.addNode(e.key)
      })

    this.wires.forEach((e) => {
      // if input and output are switch/magnet, dont connect in graph
      if (
        (e.input.key.match(/Switch/) && e.output.key.match(/Magnet/)) ||
        (e.input.key.match(/Magnet/) && e.output.key.match(/Switch/))
      ) {
        return
      }
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

    entities.forEach((e) => {
      if (e?.key.match(/^Magnet/)) {
        // find connected switches and set their value to magnet value
        const wires = entities.filter((c) =>
          c.key.match(
            new RegExp(`(Wire.+Switch.+${e.key})|Wire.+${e.key}.+Switch`),
          ),
        )
        const switchKey = wires[0]?.key.match(/(Switch-\d+)/)[0]
        const _switch = switchKey
          ? entities.find((e) => e.key === switchKey)
          : null
        if (_switch) {
          _switch.disabled = true
          _switch.value = e.value
          if (true) {
            _switch.value = e.value ? 0 : 1
          }
        }
      }
    })
  }
}
