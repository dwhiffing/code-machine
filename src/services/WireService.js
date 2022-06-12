import { Wire } from '../sprites/Wire'

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

  checkPower = () => {
    // TODO: not dealing with forks properly
    this.graph = new Map()
    this.scene.nodes.forEach((e) => {
      this.graph.set(e.key, [])
    })
    this.wires.forEach((e) => {
      this.graph.get(e.input.key)?.push(e.output.key)
      this.graph.get(e.output.key)?.push(e.input.key)
    })
    const entities = this.scene.getChildren()
    entities.forEach((e) => {
      if (!e?.key.match(/^Switch/)) e.value = 0
    })
    const start = entities.find((e) => e.key.match(/NegativeCell/))
    const end = entities.find((e) => e.key.match(/PositiveCell/))
    const _path = dfs(this.graph, start.key, end.key)
    const path = _path?.map((k) => entities.find((e) => e.key === k)) || []
    const broken = path.some(
      (node) => node?.key.match(/^Switch/) && !node.value,
    )
    path.forEach((node, i) => {
      if (node && !node?.key.match(/Switch|Cell/)) {
        node.value = broken ? 0 : 1
      }
      if (i > 0 && node && path[i - 1]) {
        const input = path[i - 1].key
        const output = node.key
        const key = `Wire-${input}:${output}`
        const key2 = `Wire-${output}:${input}`
        const wire = entities.find((e) => e.key === key || e.key === key2)
        wire.value = broken ? 0 : 1
      }
    })
  }

  removeWires = (key) => {
    const wires = this.wires.filter((w) => w.key.match(new RegExp(key)))
    this.wires = this.wires.filter((w) => !wires.some((c) => c.key === w.key))
    wires.forEach((w) => w.destroy())
    this.checkPower()
  }
}

const dfs = (
  graph,
  start = 'cell-1',
  target = 'cell-2',
  visited = new Set(),
) => {
  visited.add(start)

  const destinations = graph.get(start)
  for (const destination of destinations) {
    if (destination === target) {
      visited.add(destination)
      return [...visited]
    }

    if (!visited.has(destination)) {
      return dfs(graph, destination, target, visited)
    }
  }
}
