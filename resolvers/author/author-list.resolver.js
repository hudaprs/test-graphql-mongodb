import Author from '../../models/author.model.js';

const authorList = async () => {
  const author = new Author();
  const list = await author.list();

  return list;
};

export default authorList;
