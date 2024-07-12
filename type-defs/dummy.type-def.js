import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Game {
    _id: String!
    title: String!
    platforms: [String!]!
    reviews: [Review!]
  }
  type Review {
    _id: String!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
  }
  type Author {
    _id: String!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }
  input GameInput {
    title: String!
    platforms: [String!]!
  }
  type Query {
    reviews: [Review]
    review(_id: String!): Review
    games: [Game]
    game(_id: String!): Game
    authors: [Author]
    author(_id: String!): Author
  }
  type Mutation {
    deleteGame(_id: String!): Game
    addGame(game: GameInput!): Game
    updateGame(_id: String!, game: GameInput!): Game
  }
`;

export default typeDefs;
