import { connectDatabase } from '../db.js';
import { ObjectId } from 'bson';
import { matchIdPipeline } from '../utils/aggregate.util.js';

const COLLECTION_NAME = 'reviews';

class Review {
  /**
   * @description Get list of reviews
   *
   * @returns List of reviews
   */
  async list() {
    const db = await connectDatabase();

    const reviewList = await db.collection(COLLECTION_NAME).find().toArray();

    return reviewList;
  }

  /**
   * @description Get existing review
   *
   * @param {string} id
   *
   * @returns existed review
   */
  async show(id) {
    const db = await connectDatabase();

    if (!ObjectId.isValid(id)) throw new Error('ObjectId is not valid');

    const reviewDetail = await db
      .collection(COLLECTION_NAME)
      .aggregate([matchIdPipeline(id)])
      .toArray();

    return reviewDetail[0];
  }

  /**
   * @description Get review by author list
   *
   * @param {string} id
   * @param {string} authorId
   *
   * @returns existed review by author list
   */
  async reviewByAuthorList(id, authorId) {
    const db = await connectDatabase();

    if (!ObjectId.isValid(id)) throw new Error('ObjectId is not valid');

    const reviewDetail = await db
      .collection(COLLECTION_NAME)
      .aggregate([matchIdPipeline(id), matchIdPipeline(authorId, 'authorId')])
      .toArray();

    return reviewDetail[0];
  }
}

export default Review;
