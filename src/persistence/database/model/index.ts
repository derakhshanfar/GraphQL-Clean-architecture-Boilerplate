import { Sequelize, DataTypes } from 'sequelize';
import { schema as userSchema, init as userFactory } from './User';
import { schema as postSchema, init as postFactory } from './Post';

const env = process.env.NODE_ENV || 'development';
// TODO we can setup a config file here
const sequelize: any = new Sequelize('sqlite::memory:');

const db: {
  User: typeof userSchema;
  Post: typeof postSchema;
} = {
  User: userFactory(sequelize, DataTypes),
  Post: postFactory(sequelize, DataTypes),
};

Object.keys(db).forEach((modelName) => {
  //@ts-ignore
  if (db[modelName].associate) {
    //@ts-ignore
    db[modelName].associate(db);
  }
});

export const database = db;

export default async () => {
  await sequelize.sync({
    force: true,
  });
};
