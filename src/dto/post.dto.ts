import PostEntity from '../entities/post.entity';

export interface CreatePostDTO {
  title: string;
  userId: string;
}

export { PostEntity as PostDTO };
