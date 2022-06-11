export default class WireService {
  constructor(scene) {
    this.scene = scene
    this.wires = []
    this.graph = new Map()
    scene.nodes.forEach((e) => {
      this.graph.set(e.key, [])
    })
    this.wires.forEach((e) => {
      this.graph.get(e.input.key)?.push(e.output.key)
      this.graph.get(e.output.key)?.push(e.input.key)
    })
  }

  update() {}

  connect(nodeA, nodeB) {}

  checkPower = () => {
    // TODO: not dealing with forks properly
    const entities = [...scene.nodes, ...this.wires]
    const path =
      dfs(this.graph)?.map((k) => entities.find((e) => e.key === k)) || []
    const broken = path.some((node) => node?.type === 'switch' && !node.value)
    path.forEach((node, i) => {
      if (node && node.type !== 'switch' && node.type !== 'cell') {
        node.value = broken ? 0 : 1
      }
      if (i > 0 && node && path[i - 1]) {
        const wireKey = `wire-${path[i - 1].key}:${node.key}`
        const wire = entities.find((e) => e.key === wireKey)
        wire.value = broken ? 0 : 1
      }
    })
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
