import UserEntity from '../entities/user.entity';

export interface CreateUserDTO {
  email: string;
  password: string;
}

export type PublicUserDTO = Omit<UserEntity, 'password'>;

export interface AuthenticatedUserDTO extends PublicUserDTO {
  token: string;
}
