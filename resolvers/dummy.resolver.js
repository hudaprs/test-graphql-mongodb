import { ObjectId } from 'bson';
import db from '../db.js';

const resolver = {
  Query: {
    games() {
      return db.games;
    },
    game(_, args) {
      return db.games.find(game => game.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find(review => review.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      return db.authors.find(author => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter(review => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter(review => review.author_id === parent.id);
    },
  },
  Review: {
    game(parent) {
      return db.games.find(game => game.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find(author => author.id === parent.author_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      const gameDetail = db.games.find(game => game.id === args.id);

      if (gameDetail) {
        db.games = db.games.filter(game => game.id !== gameDetail.id);
      }

      return gameDetail;
    },
    addGame(_, { game }) {
      const newGame = {
        _id: new ObjectId(),
        title: game.title,
        platforms: game.platforms,
      };
      db.games = [newGame, ...db.games];

      return newGame;
    },
    updateGame(_, { id, game }) {
      let gameDetail = db.games.find(game => game.id === new ObjectId(id));

      if (gameDetail) {
        const mapGame = {
          ...gameDetail,
          title: game.title,
          platforms: game.platforms,
        };
        db.games = db.games.map(game =>
          game._id === mapGame._id ? mapGame : game
        );
      }

      return gameDetail;
    },
  },
};

export default resolver;
