import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Review {
    _id: String!
    rating: Int!
    content: String!
    authorId: String!
    gameId: String!
  }

  type Query {
    reviewList: [Review!]
    reviewShow(id: String): Review!
  }
`;

export default typeDefs;
