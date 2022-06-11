import Phaser from 'phaser'
import * as scenes from './scenes'

var config = {
  parent: 'phaser',
  type: Phaser.AUTO,
  width: 1980,
  height: 1050,
  backgroundColor: '#111',
  scene: Object.values(scenes),
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
}

window.game = new Phaser.Game(config)
