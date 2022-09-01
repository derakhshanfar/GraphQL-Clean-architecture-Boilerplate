import { CreateUserDTO, PublicUserDTO } from '../dto/user.dto';

export default interface UserRepositoryInterface {
  getUserByIds(ids: string[]): Promise<PublicUserDTO[] | undefined>;

  getUserByEmail(id: string): Promise<PublicUserDTO | undefined>;

  authenticateUser(email: string, password: string): Promise<PublicUserDTO | undefined>;

  createUser(data: CreateUserDTO): Promise<PublicUserDTO>;
}
