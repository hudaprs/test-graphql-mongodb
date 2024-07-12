import gql from 'graphql-tag';

const typeDefs = gql`
  type Author {
    _id: String!
    name: String!
    verified: Boolean!
  }

  type Query {
    authorList: [Author!]
    authorShow(id: String!): Author!
  }
`;

export default typeDefs;
