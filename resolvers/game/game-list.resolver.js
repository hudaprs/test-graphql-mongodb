import Game from '../../models/game.model.js';

const gameList = async () => {
  const game = new Game();
  const list = await game.list();

  return list;
};

export default gameList;
