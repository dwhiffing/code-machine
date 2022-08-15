export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' })
  }

  preload() {
    this.scene.start('Game', {
      level: Number(new URLSearchParams(location.search).get('l')),
    })
  }
}
