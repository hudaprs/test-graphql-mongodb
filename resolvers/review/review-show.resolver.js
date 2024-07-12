import Review from '../../models/review.model.js';

const reviewShow = async (parent, args) => {
  const review = new Review();
  const detail = await review.show(args.id);

  return detail;
};

export default reviewShow;
