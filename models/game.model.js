import { connectDatabase } from '../db.js';
import { ObjectId } from 'bson';
import { matchIdPipeline } from '../utils/aggregate.util.js';

const COLLECTION_NAME = 'games';

class Game {
  /**
   * @description Get list of games
   *
   * @returns List of games
   */
  async list() {
    const db = await connectDatabase();

    const gameList = await db.collection(COLLECTION_NAME).find().toArray();

    return gameList;
  }

  /**
   * @description Create new game
   *
   * @param {string} payload.title new title of the game
   * @param {string[]} payload.platforms new platform of the game
   *
   * @returns created game
   */
  async store(payload) {
    const { title, platforms } = payload.game;

    const db = await connectDatabase();

    const newGame = await db.collection(COLLECTION_NAME).insertOne({
      title,
      platforms,
    });
    const createdGame = await db
      .collection(COLLECTION_NAME)
      .aggregate([matchIdPipeline(newGame.insertedId)])
      .toArray();

    return createdGame[0];
  }

  /**
   * @description Get existing game
   *
   * @param {string} id
   *
   * @returns existed game
   */
  async show(id) {
    const db = await connectDatabase();

    if (!ObjectId.isValid(id)) throw new Error('ObjectId is not valid');

    const gameDetail = await db
      .collection(COLLECTION_NAME)
      .aggregate([matchIdPipeline(id)])
      .toArray();

    return gameDetail[0];
  }

  /**
   * @description Update new game
   *
   * @param {string} payload.id id of the game
   * @param {string} payload.title new title of the game
   * @param {string[]} payload.platforms new platform of the game
   *
   * @returns updated game
   */
  async update(payload) {
    const { id, title, platforms } = payload.game;

    if (!ObjectId.isValid(id)) throw new Error('ObjectId is not valid');

    const db = await connectDatabase();

    const detailGame = await this.show(id);
    const updatedGame = await db.collection(COLLECTION_NAME).findOneAndUpdate(
      { _id: detailGame._id },
      {
        $set: {
          title,
          platforms,
        },
      },
      {
        returnDocument: 'after',
      }
    );

    return updatedGame;
  }

  /**
   * @description Delete existing game
   *
   * @param {string} id id of the game
   *
   * @returns deleted game
   */
  async destroy(id) {
    const db = await connectDatabase();

    if (!ObjectId.isValid(id)) throw new Error('ObjectId is not valid');

    const gameDetail = await this.show(id);
    await db.collection(COLLECTION_NAME).deleteOne({ _id: gameDetail._id });

    return gameDetail;
  }
}

export default Game;
