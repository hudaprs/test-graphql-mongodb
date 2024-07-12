import authorList from './author-list.resolver.js';
import authorShow from './author-show.resolver.js';
import reviewList from '../review/review-list.resolver.js';

const resolver = {
  Query: {
    authorList,
    authorShow,
  },
  Author: {
    // ! Need to be updated, bad query
    // ! Just want to know the output
    reviews: async parent => {
      const list = await reviewList();

      return list.filter(
        review => review.authorId.toString() === parent._id.toString()
      );
    },
  },
};

export default resolver;
