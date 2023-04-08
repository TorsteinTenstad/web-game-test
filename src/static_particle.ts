import { DrawInfo, PositionObject } from 'web-game-engine';

export class StaticParticle extends PositionObject {
  radius = 20;
  charge = 1;
  draw(info: DrawInfo) {
    info.canvas.drawCircle(this.radius, this.pos, {
      fillStyle: this.charge > 0 ? 'green' : 'red',
    });
  }
}
