import { ObjectId } from 'bson';

/**
 * @description Match id with string or ObjectID in mongo
 *
 * @note this is not required, but just for example to just make it work (to ensure data match with string or ObjectId)
 *
 * @param {string} id identifier of data
 * @param {string} key custom identifier beside 'id'
 *
 * @returns aggregate pipeline for mongo
 */
export const matchIdPipeline = (id, key = '') => {
  return {
    $match: {
      $or: [
        {
          [key || '_id']: new ObjectId(id),
        },
        {
          [key || '_id']: id,
        },
      ],
    },
  };
};
