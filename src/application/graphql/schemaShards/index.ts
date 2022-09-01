/**
 * This file merges all of the schemas that belong to different parts of the shards
 */
import users from './users';
import posts from './posts';
import { mergeRawSchemas } from '../utils/mergeRawSchemas';

export default mergeRawSchemas(users, posts);
