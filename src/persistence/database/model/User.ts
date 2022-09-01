import { Model, UUIDV4, Optional } from 'sequelize';

interface UserAttributes {
  id: string;
  email: string;
  password: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: string;
  email!: string;
  password!: string;
  static associate(models: any) {
    User.hasMany(models.Post, {
      sourceKey: 'id',
      foreignKey: 'userId',
    });
  }
}

export const schema = User;
export const init = (sequelize: any, DataTypes: any) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
