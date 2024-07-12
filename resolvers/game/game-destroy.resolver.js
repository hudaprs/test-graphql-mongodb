import Game from '../../models/game.model.js';

const gameDestroy = async (parent, args) => {
  const game = new Game();
  const deletedGame = await game.destroy(args.id);

  return deletedGame;
};

export default gameDestroy;
