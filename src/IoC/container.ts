import { createContainer, InjectionMode } from 'awilix';

import ICradle from './icradle.interface';
import authProvider from './providers/auth.provider';
import userProvider from './providers/user.provider';
import postProvider from './providers/post.provider';

const container = createContainer<ICradle>({
  injectionMode: InjectionMode.CLASSIC,
});

authProvider(container);
userProvider(container);
postProvider(container);

export default container;
