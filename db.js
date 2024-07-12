import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

let client = null;

export const connectDatabase = async () => {
  if (!client) {
    const url = 'mongodb://localhost:27017';
    const database = 'test-graphql-mongo';
    const mongoClient = new MongoClient(url);

    try {
      await mongoClient.connect();

      client = mongoClient.db(database);

      console.log(`Mongo connected to ${url} with database ${database}`);
    } catch (err) {
      console.error('MONGO ERROR', err);
      process.exit(1);
    }
  }

  return client;
};

let games = [
  {
    _id: new ObjectId(),
    title: 'Zelda, Tears of the Kingdom',
    platforms: ['Switch'],
  },
  {
    _id: new ObjectId(),
    title: 'Final Fantasy 7 Remake',
    platforms: ['PS5', 'Xbox'],
  },
  {
    _id: new ObjectId(),
    title: 'Elden Ring',
    platforms: ['PS5', 'Xbox', 'PC'],
  },
  { _id: new ObjectId(), title: 'Mario Kart', platforms: ['Switch'] },
  {
    _id: new ObjectId(),
    title: 'Pokemon Scarlet',
    platforms: ['PS5', 'Xbox', 'PC'],
  },
];

let authors = [
  { _id: new ObjectId(), name: 'mario', verified: true },
  { _id: new ObjectId(), name: 'yoshi', verified: false },
  { _id: new ObjectId(), name: 'peach', verified: true },
];

let reviews = [
  {
    _id: new ObjectId(),
    rating: 9,
    content: 'lorem ipsum',
    authorId: authors[0]._id,
    gameId: games[1]._id,
  },
  {
    _id: new ObjectId(),
    rating: 10,
    content: 'lorem ipsum',
    authorId: authors[1]._id,
    gameId: games[0]._id,
  },
  {
    _id: new ObjectId(),
    rating: 7,
    content: 'lorem ipsum',
    authorId: authors[2]._id,
    gameId: games[2]._id,
  },
  {
    _id: new ObjectId(),
    rating: 5,
    content: 'lorem ipsum',
    authorId: authors[2]._id,
    gameId: games[3]._id,
  },
  {
    _id: new ObjectId(),
    rating: 8,
    content: 'lorem ipsum',
    authorId: authors[1]._id,
    gameId: games[4]._id,
  },
  {
    _id: new ObjectId(),
    rating: 7,
    content: 'lorem ipsum',
    authorId: authors[0]._id,
    gameId: games[1]._id,
  },
  {
    _id: new ObjectId(),
    rating: 10,
    content: 'lorem ipsum',
    authorId: authors[2]._id,
    gameId: games[1]._id,
  },
];

export default { games, authors, reviews };
