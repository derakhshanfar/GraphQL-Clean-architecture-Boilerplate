import { asClass, AwilixContainer } from 'awilix';
import PostRepository from '../../persistence/post.repository';
import PostService from '../../services/post.service';

import ICradle from '../icradle.interface';

export interface IPostProvider {
  postRepository: PostRepository;
  postService: PostService;
}

const userProvider = (container: AwilixContainer<ICradle>): void => {
  // Register the classes
  container.register({
    postRepository: asClass(PostRepository),
    postService: asClass(PostService),
  });
};

export default userProvider;
