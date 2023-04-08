import { Game, TextObject } from 'web-game-engine';
import { Player } from './player';
import { StaticParticle } from './static_particle';

const game = new Game(document.querySelector('#app'));

new StaticParticle(50, 50).activate(game);
new StaticParticle(200, 200).activate(game);
new StaticParticle(400, 250).activate(game);
new Player(300, 50).activate(game);
new TextObject(() => `FPS: ${game.currentFps.toFixed(1)}`, 8, 8).activate(game);

game.play();
