import Review from '../../models/review.model.js';

const reviewList = async () => {
  const review = new Review();
  const list = await review.list();

  return list;
};

export default reviewList;
