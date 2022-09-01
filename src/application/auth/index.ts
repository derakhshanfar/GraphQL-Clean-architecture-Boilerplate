import { Request, Response } from 'express';
import container from '../../IoC/container';
import { AuthenticatedUserDTO } from '../../dto/user.dto';

// our context interface
export interface IContext {
  token?: string;
}

function createContext(token: string): Promise<IContext> | IContext {
  return {
    token,
  };
}

export function handleGraphQLContext(ctx: { connection?: any; req?: Request; res?: Response }) {
  const { req } = ctx;
  const token = req?.headers?.token;
  return createContext(token as string);
}

export async function authenticateContext(context: IContext): Promise<AuthenticatedUserDTO> {
  if (!context.token) {
    throw new Error('user is not logged in');
  }
  const user = await container.cradle.authService.authenticateUserByToken(context.token);
  if (!user) {
    throw new Error('invalid token');
  }
  return user;
}
