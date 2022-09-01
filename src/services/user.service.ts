import { AuthenticatedUserDTO, CreateUserDTO, PublicUserDTO } from '../dto/user.dto';
import { Response } from '../dto/generic.dto';

import AuthRepositoryInterface from './auth.repository.interface';
import UserRepositoryInterface from './user.repository.interface';
import execute from './utils/execute';
import { isEmail } from './utils/validator';
export default class UserService {
  constructor(
    private userRepository: UserRepositoryInterface,
    private authRepository: AuthRepositoryInterface,
    DataLoader: any
  ) {
    //@ts-ignore
    this.dataLoader = new DataLoader<string, PublicUserDTO>(this.userRepository.getUserByIds.bind(this.userRepository));
  }

  getUserById(userId: string): Promise<PublicUserDTO | undefined> {
    //@ts-ignore
    return this.dataLoader.load(userId);
  }

  async register(data: CreateUserDTO): Promise<Response<AuthenticatedUserDTO>> {
    return execute(async () => {
      const { email, password } = data;
      if (!email || !password) {
        throw new Error('email and password should filled');
      }

      if (!isEmail(email)) {
        throw new Error('email is not valid');
      }

      const existedUser = await this.userRepository.getUserByEmail(data.email);

      if (existedUser) {
        // TODO better error handling
        throw new Error('User is exist');
      }

      const createdUser = await this.userRepository.createUser(data);

      const token = await this.authRepository.generateToken(createdUser);

      return {
        ...createdUser,
        token,
      };
    });
  }
}
