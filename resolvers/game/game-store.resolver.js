import Game from '../../models/game.model.js';

const gameStore = async (parent, args) => {
  const game = new Game();
  const newGame = await game.store(args);

  return newGame;
};

export default gameStore;
