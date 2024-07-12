import gql from 'graphql-tag';

const typeDefs = gql`
  type Game {
    _id: String!
    id: String!
    title: String!
    platforms: [String!]
  }

  input GameStore {
    title: String!
    platforms: [String!]
  }

  input GameUpdate {
    id: String!
    title: String!
    platforms: [String!]
  }

  type Query {
    gameList: [Game!]
    gameShow(id: String!): Game!
  }

  type Mutation {
    gameStore(game: GameStore!): Game!
    gameUpdate(game: GameUpdate!): Game!
    gameDestroy(id: String!): Game!
  }
`;

export default typeDefs;
