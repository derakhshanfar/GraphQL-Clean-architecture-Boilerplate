import { AuthenticatedUserDTO } from '../dto/user.dto';
import { Response } from '../dto/generic.dto';
import AuthRepositoryInterface from './auth.repository.interface';
import UserRepositoryInterface from './user.repository.interface';
import execute from './utils/execute';
import { isEmail } from './utils/validator';
export default class AuthService {
  constructor(private authRepository: AuthRepositoryInterface, private userRepository: UserRepositoryInterface) {}

  async authenticateUser(email: string, password: string): Promise<Response<AuthenticatedUserDTO | undefined>> {
    return execute(async () => {
      if (!email || !password) {
        throw new Error('email and password should filled');
      }

      if (!isEmail(email)) {
        throw new Error('email is not valid');
      }

      const authenticatedUser = await this.userRepository.authenticateUser(email, password);

      if (!authenticatedUser) return;

      const token = await this.authRepository.generateToken(authenticatedUser);

      return {
        ...authenticatedUser,
        token,
      };
    });
  }

  async authenticateUserByToken(token: string): Promise<AuthenticatedUserDTO | undefined> {
    return this.authRepository.getAuthenticatedUserByToken(token);
  }
}
