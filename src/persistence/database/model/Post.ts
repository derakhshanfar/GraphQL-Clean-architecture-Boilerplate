import { Model, UUIDV4, Optional } from 'sequelize';

interface PostAttributes {
  id: string;
  title: string;
  userId: string;
  createdAt: Date;
}

type PostCreationAttributes = Optional<PostAttributes, 'id'>;

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  id!: string;
  title!: string;
  userId!: string;
  createdAt: Date = new Date();

  static associate(models: any) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  }
}

export const schema = Post;
export const init = (sequelize: any, DataTypes: any) => {
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
