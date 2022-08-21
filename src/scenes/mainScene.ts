import 'phaser';

import phaserPng from '../assets/phaser.png';

export class MainScene extends Phaser.Scene {
  private image!: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'MainScene' });
  }

  public preload() {
    this.load.image('phaser', phaserPng);
  }

  // Step 01 - Init
  public create() {
    this.image = this.add.image(400, 300, 'phaser');

    this.input.on('pointerdown', (event: any) => {
      this.image.x = event.x;
      this.image.y = event.y;
    });
  }

  // Step 02 - Update Loop
  public update(time: number, delta: number): void {

  }

  // Step 03 - Exit
  public destroy(): void {

  }
}
