import { asClass, asValue, AwilixContainer } from 'awilix';
import Dataloader from 'dataloader';

import UserRepository from '../../persistence/user.repository';
import UserService from '../../services/user.service';
import ICradle from '../icradle.interface';

export interface IUserProvider {
  userRepository: UserRepository;
  userService: UserService;
  DataLoader: any;
}

const userProvider = (container: AwilixContainer<ICradle>): void => {
  // Register the classes
  container.register({
    userRepository: asClass(UserRepository),
    userService: asClass(UserService),
    DataLoader: asValue(Dataloader),
  });
};

export default userProvider;
