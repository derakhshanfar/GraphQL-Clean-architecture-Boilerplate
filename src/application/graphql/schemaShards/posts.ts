import container from '../../../IoC/container';
import { authenticateContext } from '../../auth';
import { gql } from 'apollo-server';

const typeDefs = gql`
  extend type Query {
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    createdAt: String!
    user: User!
  }

  extend type Mutation {
    createPost(input: InputCreatePost!): PostAuthPayload
  }

  " used for creating a new user "
  input InputCreatePost {
    title: String!
  }

  type PostAuthPayload {
    userErrors: [UserError!]!
    data: Post
  }
`;

export default {
  resolvers: {
    Query: {
      posts: async (root: any, __: any, context: any) => {
        await authenticateContext(context);
        return container.cradle.postService.getPosts();
      },
    },
    Post: {
      user: (root: any) => {
        return container.cradle.userService.getUserById(root.userId);
      },
    },
    Mutation: {
      // register
      createPost: async (root: any, { input }: GQL.MutationToCreatePostArgs, context: any) => {
        const user = await authenticateContext(context);
        return container.cradle.postService.createPost({
          ...input,
          userId: user.id,
        });
      },
    },
  },
  typeDefs: [typeDefs],
};
