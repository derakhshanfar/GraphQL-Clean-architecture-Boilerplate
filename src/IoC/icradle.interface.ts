import { IAuthProvider } from './providers/auth.provider';
import { IUserProvider } from './providers/user.provider';
import { IPostProvider } from './providers/post.provider';

export default interface ICradle extends IAuthProvider, IUserProvider, IPostProvider {}
