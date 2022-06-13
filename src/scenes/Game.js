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
    this.dragStart = { x: this.camera.scrollX, y: this.camera.scrollY }
    if (objects.length === 0 || !this.shiftKey.isDown) {
      this.deselect()
    }
  }

  onPointerUp = () => {
    this.isDraggingNode = false
    this.clearSelectBox()
  }

  onPointerMove = (p) => {
    if (this.isDraggingNode || !p.isDown) return

    if (this.shiftKey.isDown && this.mode === 1) {
      this.handleSelectBox(p)
    } else {
      this.onDragCamera(p)
    }
  }

  onDragNode = (_, object, x, y) => {
    if (this.mode !== 1) return
    this.isDraggingNode = true
    object.setPosition(x, y)
    object.children?.forEach((c) => c.setPosition(x, y))
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
      if (e.key === 'x') this.nodeService.deleteSelectedNodes()
    }
  }

  toggleEditMode = () => {
    this.mode = this.mode ? 0 : 1
    this.getEntities().forEach((c) => c.text.setAlpha(this.mode))
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
    this.selectBox.setDisplaySize(0, 0)
  }

  handleSelectBox = (p) => {
    if (this.selectBox.x == 0) {
      this.selectBox.setPosition(p.worldX, p.worldY)
    }
    this.selectBox.setDisplaySize(p.x - p.downX, p.y - p.downY)
    // TODO: whenever box changes, check which nodes are intersecting and update selected status
  }

  getEntities = () => [...this.nodeService.nodes, ...this.wireService.wires]
}
