import Game from '../../models/game.model.js';

const gameShow = async (parent, args) => {
  const game = new Game();
  const detail = await game.show(args.id);

  return detail;
};

export default gameShow;
