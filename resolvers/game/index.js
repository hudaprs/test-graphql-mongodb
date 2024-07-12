import gameList from './game-list.resolver.js';
import gameStore from './game-store.resolver.js';
import gameShow from './game-show.resolver.js';
import gameUpdate from './game-update.resolver.js';
import gameDestroy from './game-destroy.resolver.js';
import reviewList from '../review/review-list.resolver.js';

const resolver = {
  Query: {
    gameList,
    gameShow,
  },
  Mutation: {
    gameStore,
    gameUpdate,
    gameDestroy,
  },
  Game: {
    // ! Need to be updated, bad query
    // ! Just want to know the output
    reviews: async parent => {
      const list = await reviewList();

      return list.filter(
        review => review.gameId.toString() === parent._id.toString()
      );
    },
  },
};

export default resolver;
