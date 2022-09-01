import { CreatePostDTO, PostDTO } from '../dto/post.dto';
import { Response } from '../dto/generic.dto';
import PostRepositoryInterface from './post.repository.interface';
import execute from './utils/execute';

export default class PostService {
  constructor(private postRepository: PostRepositoryInterface) {}

  getPosts(): Promise<PostDTO[] | undefined> {
    return this.postRepository.getPosts();
  }

  async createPost(data: CreatePostDTO): Promise<Response<PostDTO>> {
    return execute(async () => {
      const createdPost = await this.postRepository.createPost(data);

      return {
        ...createdPost,
      };
    });
  }
}
