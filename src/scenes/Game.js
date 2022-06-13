import { LEVEL } from '../constants'
import WireService from '../services/WireService'
import { NegativeCell, PositiveCell } from '../sprites/Cell'
import { Light } from '../sprites/Light'
import { Magnet } from '../sprites/Magnet'
import { Node } from '../sprites/Node'
import { Switch } from '../sprites/Switch'
const SPRITES = { Magnet, NegativeCell, PositiveCell, Light, Node, Switch }

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  init() {}

  create() {
    this.loadLevel(LEVEL)

    this.time.addEvent({
      delay: 250,
      repeat: -1,
      callback: this.wireService.checkPower,
    })

    this.input.on('drag', (_, object, x, y) => {
      if (this.mode !== 1) return
      this.isDragging = true
      object.setPosition(x, y)
      object.children?.forEach((c) => c.setPosition(x, y))
    })

    this.input.on('wheel', this.onWheel)

    this.input.on('pointerdown', (p, objects) => {
      const camera = this.cameras.main
      this.dragStart = { x: camera.scrollX, y: camera.scrollY }
      if (objects.length === 0) {
        this.getChildren().forEach((w) => w.toggleSelect(false))
      }
    })

    this.input.on('pointerup', () => {
      this.isDragging = false
    })

    this.input.on('pointermove', (p) => {
      if (!this.isDragging && p.isDown) {
        this.onDragCamera(p)
      }

      const nodes = this.getChildren().filter((p) => p.placing)
      nodes.forEach((n) => n.sprite.setPosition(p.x, p.y))
    })

    this.input.keyboard.on('keyup', (e) => {
      if (e.key === ' ') this.toggleEditMode()
      if (e.key === 'p') this.exportLevelToClipboard()

      if (this.mode !== 1) return

      if (e.key === 'c') this.connectSelectedNodes()
      if (e.key === '1') this.placeNode()
      if (e.key === 'x') this.deleteSelectedNodes()
    })
  }

  update() {
    this.wireService.update()
  }

  loadLevel = (level) => {
    this.mode = 0
    this.nodes = level
      .filter((o) => !o.key.match(/^Wire/))
      .map((o) => new SPRITES[o.key.split('-')[0]](this, o.x, o.y))

    this.wireService = new WireService(this)

    level
      .filter((o) => o.key.match(/^Wire/))
      .forEach((o) =>
        this.wireService.connect(
          this.nodes.find((n) => n.key === o.input),
          this.nodes.find((n) => n.key === o.output),
        ),
      )
  }

  toggleEditMode = () => {
    this.mode = this.mode ? 0 : 1
    this.getChildren().forEach((c) => c.text.setAlpha(this.mode))
  }

  placeNode = () => {
    const node = new Node(this, 1200, 800)
    node.placing = true
    node.sprite.setPosition(this.input.activePointer)
    this.nodes.push(node)
  }

  connectSelectedNodes = () => {
    const children = this.getChildren().filter(
      (w) => w.selected && !w.key.match(/^Wire/),
    )
    if (children.length === 2) {
      this.wireService.connect(...children)
      children.forEach((c) => c.toggleSelect(false))
    }
  }

  deleteSelectedNodes = () => {
    this.getChildren()
      .filter((w) => w.selected)
      .forEach((s) => this.removeNode(s))
  }

  exportLevelToClipboard = () => {
    const exported = this.getChildren().map((c) => {
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

  removeNode = (node) => {
    const key = node.key
    const nodes = this.nodes.filter((w) => w.key.match(new RegExp(key)))
    this.nodes = this.nodes.filter((w) => !nodes.some((c) => c.key === w.key))
    this.wireService.disconnect(node)
    nodes.forEach((w) => w.destroy())
  }

  drawCanvas(image, size) {
    const key = 'key' + Date.now()
    const canvas = this.textures.createCanvas(key, size * 3, size * 3)
    canvas.context.drawImage(image, size, size)
    canvas.refresh()
    return key
  }

  onWheel = (p, o, x, y) => {
    const camera = this.cameras.main
    camera.zoom -= y * 0.001
    if (camera.zoom < 0.2) camera.zoom = 0.2
    if (camera.zoom > 2) camera.zoom = 2
  }
  onDragCamera = (p) => {
    const camera = this.cameras.main
    const scale = 1 / camera.zoom
    const diffX = (p.position.x - p.downX) * scale
    const diffY = (p.position.y - p.downY) * scale
    camera.scrollX = this.dragStart.x - diffX
    camera.scrollY = this.dragStart.y - diffY
  }

  getChildren = () => [...this.nodes, ...this.wireService.wires]
}
