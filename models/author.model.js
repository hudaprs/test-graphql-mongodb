import { connectDatabase } from '../db.js';
import { ObjectId } from 'bson';
import { matchIdPipeline } from '../utils/aggregate.util.js';

const COLLECTION_NAME = 'authors';

class Author {
  /**
   * @description Get list of authors
   *
   * @returns List of authors
   */
  async list() {
    const db = await connectDatabase();

    const authorList = await db.collection(COLLECTION_NAME).find().toArray();

    return authorList;
  }

  /**
   * @description Get existing author
   *
   * @param {string} id
   *
   * @returns existed author
   */
  async show(id) {
    const db = await connectDatabase();

    if (!ObjectId.isValid(id)) throw new Error('ObjectId is not valid');

    const authorDetail = await db
      .collection(COLLECTION_NAME)
      .aggregate([matchIdPipeline(id)])
      .toArray();

    return authorDetail[0];
  }
}

export default Author;
