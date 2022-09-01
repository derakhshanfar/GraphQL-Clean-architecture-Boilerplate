import { CreatePostDTO, PostDTO } from '../dto/post.dto';

export default interface PostRepositoryInterface {
  getPosts(): Promise<PostDTO[] | []>;

  createPost(data: CreatePostDTO): Promise<PostDTO>;
}
