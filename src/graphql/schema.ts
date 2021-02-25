import { gql } from "apollo-server-express";

const schema = gql`
  type Query {
    notes: [Note]
    note(id: ID!): Note
    me: DisplayUser
    logout: String
  }

  type Mutation {
    login(username:String!, password:String!): DisplayUser!
    register(username: String, password: String, fullname: String): User!
    addNote(title: String, text: String): Note!
    removeNote(id: Int!): Int!
  }

  type User {
    username: String!
    password: String!
    fullname: String
  }

  type DisplayUser {
    id: Int
    username: String
    fullname: String
  }

  type Note {
    id: Int!
    title: String
    text: String
    userId: Int!
  }
`;

export default schema;
