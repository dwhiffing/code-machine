import { LEVEL } from '../constants'
import WireService from '../services/WireService'
import NodeService from '../services/NodeService'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  init() {}

  create() {
    this.mode = 0
    this.camera = this.cameras.main
    this.nodeService = new NodeService(this)
    this.wireService = new WireService(this)
    this.nodeService.loadLevel(LEVEL)

    this.selectBox = this.add
      .rectangle(0, 0, 1, 1)
      .setOrigin(0, 0)
      .setFillStyle(0xffffff, 0.1)

    const { SHIFT } = Phaser.Input.Keyboard.KeyCodes
    this.shiftKey = this.input.keyboard.addKey(SHIFT)
    this.input.on('pointerdown', this.onPointerDown)
    this.input.on('pointerup', this.onPointerUp)
    this.input.on('pointermove', this.onPointerMove)
    this.input.on('drag', this.onDragNode)
    this.input.on('wheel', this.onWheel)
    this.input.keyboard.on('keyup', this.onKeyUp)
  }

  update() {
    this.wireService.update()
  }

  onPointerDown = (p, objects) => {
    this.clickStart = { x: p.x, y: p.y }
    this.dragStart = { x: this.camera.scrollX, y: this.camera.scrollY }
    this.clickedOnNothing = objects.length === 0
    this.nodeService.updatePosMap()
  }

  onPointerUp = (p, objects) => {
    if (
      Math.abs(this.selectBox.width) < 1 &&
      (this.clickedOnNothing || objects.length === 0)
    ) {
      this.deselect()
    }

    this.clearSelectBox()
    this.isDraggingNode = false
    this.clickedOnNothing = false
  }

  onPointerMove = (p) => {
    if (this.isDraggingNode || !p.isDown) return

    if (this.shiftKey.isDown && this.mode === 1) {
      this.handleSelectBox(p)
    } else if (!this.getEntities().some((e) => e.placing)) {
      this.onDragCamera(p)
    }
  }

  onDragNode = (p, object) => {
    if (this.mode !== 1 || this.getEntities().some((e) => e.placing)) return
    this.isDraggingNode = true
    let nodes = this.getSelectedNodes()
    if (nodes.length === 0) {
      nodes = this.getEntities().filter((e) => e.key === object._parent.key)
    }

    const diffX = p.x - this.clickStart.x
    const diffY = p.y - this.clickStart.y
    this.nodeService.moveNodes(nodes, diffX, diffY)
  }

  onWheel = (p, o, x, y) => {
    this.camera.zoom -= y * 0.001
    if (this.camera.zoom < 0.2) this.camera.zoom = 0.2
    if (this.camera.zoom > 2) this.camera.zoom = 2
  }

  onKeyUp = (e) => {
    if (e.key === ' ') this.toggleEditMode()
    if (e.key === 'p') this.nodeService.exportLevelToClipboard()

    if (this.mode === 1) {
      if (e.key === '1') this.nodeService.placeNode()
      if (e.key === 'c') this.nodeService.connectSelectedNodes()
      if (e.key === 'v') this.nodeService.cloneSelectedNodes()
      if (e.key === 'x') this.nodeService.deleteSelectedNodes()
    }
  }

  toggleEditMode = () => {
    this.mode = this.mode ? 0 : 1
    this.getEntities().forEach((c) => c.text.setAlpha(this.mode))
    this.deselect()
  }

  onDragCamera = (p) => {
    const scale = 1 / this.camera.zoom
    this.camera.scrollX = this.dragStart.x - (p.position.x - p.downX) * scale
    this.camera.scrollY = this.dragStart.y - (p.position.y - p.downY) * scale
  }

  deselect = () => {
    this.getEntities().forEach((w) => w.toggleSelect(false))
  }

  clearSelectBox = (p) => {
    this.selectBox.setPosition(0, 0)
    this.selectBox.setSize(0, 0)
  }

  handleSelectBox = (p) => {
    const { Rectangle } = Phaser.Geom
    const { width, height, x, y } = this.selectBox
    if (x === 0 && y === 0) {
      this.selectBox.setPosition(p.worldX, p.worldY)
    }
    const scale = 1 / this.camera.zoom
    this.selectBox.setSize((p.x - p.downX) * scale, (p.y - p.downY) * scale)

    const _x = width < 0 ? p.worldX : x
    const _y = height < 0 ? p.worldY : y
    const box = new Rectangle(_x, _y, Math.abs(width), Math.abs(height))
    this.getEntities().forEach((e) => e.toggleSelect(box.contains(e.x, e.y)))
  }

  getSelectedNodes = () =>
    this.getEntities().filter((e) => e.selected && !e.key.match(/Wire/))

  getEntities = () => [...this.nodeService.nodes, ...this.wireService.wires]
}
