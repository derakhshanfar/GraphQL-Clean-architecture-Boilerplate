import { Response } from '../../dto/generic.dto';

export default async function <T>(fn: () => Promise<T>): Promise<Response<T>> {
  try {
    const res = await fn();

    return {
      userErrors: [],
      data: res,
    };
  } catch (error) {
    // TODO improve error handling
    return {
      userErrors: [{ message: error.message }],
    };
  }
}
