import reviewList from './review-list.resolver.js';
import reviewShow from './review-show.resolver.js';
import gameList from '../game/game-list.resolver.js';
import authorList from '../author/author-list.resolver.js';

const resolver = {
  Query: {
    reviewList,
    reviewShow,
  },
  Review: {
    // ! Need to be updated, bad query
    // ! Just want to know the output
    game: async parent => {
      const list = await gameList();

      return list.find(
        game => game._id.toString() === parent.gameId.toString()
      );
    },

    // ! Need to be updated, bad query
    // ! Just want to know the output
    author: async parent => {
      const list = await authorList();

      return list.find(
        author => author._id.toString() === parent.authorId.toString()
      );
    },
  },
};

export default resolver;
