import { GameObject, StepInfo, Vec2 } from 'web-game-engine';
import { StaticParticle } from './static_particle';

export class Particle extends StaticParticle {
  acceleration = new Vec2(0, 0);
  speed = new Vec2(0, 0);

  step(info: StepInfo) {
    const gameObjects = (info.game as any).__gameObjects as GameObject[];
    const particles = gameObjects.filter(
      (o) => o instanceof StaticParticle
    ) as StaticParticle[];
    this.acceleration = new Vec2(0, 0);
    for (const particle of particles) {
      if (particle == this) {
        continue;
      }
      const dist = this.pos.minus(particle.pos);
      const mag = dist.lengthTo(new Vec2(0, 0));
      const acceleration_contribution = dist.multiply(
        (250 * (this.charge * particle.charge)) / (mag * mag * mag)
      );
      this.acceleration = this.acceleration.plus(acceleration_contribution);
    }
    const max_acc = 0.2;
    this.acceleration.x = Math.max(
      -max_acc,
      Math.min(max_acc, this.acceleration.x)
    );
    this.acceleration.y = Math.max(
      -max_acc,
      Math.min(max_acc, this.acceleration.y)
    );

    if (this.acceleration.x > max_acc) {
      console.log(this.acceleration);
    }

    this.speed = this.speed.plus(this.acceleration.multiply(info.dtFactor));
    this.pos = this.pos.plus(this.speed.multiply(info.dtFactor));

    const canvasSize = info.game.getCanvasSize();
    if (this.pos.x < 0 || canvasSize.x < this.pos.x) this.speed.x *= -0.7;
    if (this.pos.y < 0 || canvasSize.y < this.pos.y) this.speed.y *= -0.7;
  }
}
