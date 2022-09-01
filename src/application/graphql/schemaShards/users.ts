import container from '../../../IoC/container';
import { authenticateContext } from '../../auth';
import { gql } from 'apollo-server';

const typeDefs = gql`
  extend type Query {
    " login as a user "
    loginUser(input: InputLogin!): AuthPayload
    " get a user's public data"
    getUser(id: ID!): PublicUser
  }
  extend type Mutation {
    " register a new user "
    registerUser(input: InputRegisterUser!): AuthPayload
  }
  " used for logging in "
  input InputLogin {
    email: String!
    password: String!
  }
  " used for creating a new user "
  input InputRegisterUser {
    email: String!
    password: String!
  }
  " a type defining a user's public data "
  type PublicUser {
    id: ID
    email: String
  }
  " a type defining a user  "
  type User {
    id: ID
    email: String
    token: String
  }

  type UserError {
    message: String!
  }

  type AuthPayload {
    userErrors: [UserError!]!
    data: User
  }
`;

export default {
  resolvers: {
    Query: {
      // login
      loginUser: (root: any, { input: { email, password } }: GQL.QueryToLoginUserArgs) =>
        container.cradle.authService.authenticateUser(email, password),
      // get a user
      getUser: async (root: any, { id }: GQL.QueryToGetUserArgs, context: any) => {
        await authenticateContext(context);
        return container.cradle.userService.getUserById(id);
      },
    },
    Mutation: {
      // register
      registerUser: (root: any, { input }: GQL.MutationToRegisterUserArgs) =>
        container.cradle.userService.register(input),
    },
  },
  typeDefs: [typeDefs],
};
