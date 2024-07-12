import Author from '../../models/author.model.js';

const authorShow = async (parent, args) => {
  const author = new Author();
  const detail = await author.show(args.id);

  return detail;
};

export default authorShow;
