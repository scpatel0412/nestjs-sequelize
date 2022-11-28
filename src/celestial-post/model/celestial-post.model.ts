import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { PostCommentModel } from 'src/post-comment/model/post-comment.model';
import { PostLikeModel } from 'src/post-like/model/post-like.model';
import { UserModel } from '../../user/model/user.model';

@Scopes({
  users: () => {
    return {
      include: {
        model: UserModel,
        as: 'users',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  likes: () => {
    return {
      include: {
        model: PostLikeModel,
        as: 'likes',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  comments: () => {
    return {
      include: {
        model: PostCommentModel,
        as: 'comments',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@ObjectType('CelestialPost')
@Table({ modelName: 'celestial_post' })
export class CelestialPostModel extends Model<CelestialPostModel> {
  @Field(() => String)
  @Column({
    type: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  metatitle: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  metadescription: string;

  @Field(() => Boolean)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  status: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id' })
  userId: string;

  @Field(() => UserModel)
  @BelongsTo(() => UserModel)
  users: UserModel;

  @Field(() => [PostLikeModel], { nullable: true })
  @HasMany(() => PostLikeModel)
  likes: PostLikeModel[];

  @Field(() => [PostCommentModel], { nullable: true })
  @HasMany(() => PostCommentModel)
  comments: PostCommentModel[];
}
