import { Op } from 'sequelize';

import { CreateUserDTO, PublicUserDTO } from '../dto/user.dto';
import UserRepositoryInterface from '../services/user.repository.interface';
import { checkPassword, hashPassword } from './password';
import UserEntity from '../entities/user.entity';
import { database } from './database/model';

export default class UserRepository implements UserRepositoryInterface {
  async getUserByIds(ids: string[]): Promise<PublicUserDTO[] | undefined> {
    const users = await database.User.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      raw: true,
    });

    const userMap: { [key: string]: PublicUserDTO } = {};
    const normalizeUser = this.normalizeUser;

    users.forEach((user) => {
      userMap[user.id] = normalizeUser(user);
    });

    return ids.map((id) => userMap[id]);
  }

  async getUserByEmail(email: string): Promise<PublicUserDTO | undefined> {
    const user = await database.User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return this.normalizeUser(user);
    }
  }

  async authenticateUser(email: string, password: string): Promise<PublicUserDTO | undefined> {
    const user = await database.User.findOne({
      where: {
        email,
      },
    });

    if (!user) return;

    const isCorrectPassword = await checkPassword(password, user.password);

    if (!isCorrectPassword) return;

    return this.normalizeUser(user);
  }

  async createUser(data: CreateUserDTO): Promise<PublicUserDTO> {
    const user = await database.User.create({
      email: data.email,
      password: await hashPassword(data.password),
    });

    return this.normalizeUser(user);
  }

  normalizeUser(rawUser: UserEntity): PublicUserDTO {
    return {
      id: rawUser.id,
      email: rawUser.email,
    };
  }
}
