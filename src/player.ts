import { KeyboardKey } from 'web-game-engine/lib/input';
import { Particle } from './particle';

export class Player extends Particle {
  onKeyPress(key: KeyboardKey): void {
    if ((key as string) == ' ') {
      this.charge *= -1;
    }
  }
}
