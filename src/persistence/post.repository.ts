import { CreatePostDTO, PostDTO } from '../dto/post.dto';
import PostRepositoryInterface from '../services/post.repository.interface';
import { database } from './database/model';
import PostEntity from '../entities/post.entity';

export default class PostRepository implements PostRepositoryInterface {
  async getPosts(): Promise<PostDTO[] | []> {
    const posts = await database.Post.findAll({});
    return this.normalizePosts(posts);
  }

  async createPost(data: CreatePostDTO): Promise<PostDTO> {
    const createdPost = await database.Post.create({
      createdAt: new Date(),
      title: data.title,
      userId: data.userId,
    });

    return this.normalizePosts([createdPost])[0];
  }

  normalizePosts(rawPosts: PostEntity[]): PostDTO[] {
    return rawPosts.map((row) => {
      return {
        id: row.id,
        createdAt: row.createdAt,
        title: row.title,
        userId: row.userId,
      };
    });
  }
}
