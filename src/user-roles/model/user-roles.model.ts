import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserModel } from 'src/user/model/user.model';

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
})
@ObjectType('UserRoles')
@Table({ modelName: 'user_roles' })
export class UserRolesModel extends Model<UserRolesModel> {
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
  name: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value_info: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

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

  @Field(() => [UserModel], { nullable: true })
  @HasMany(() => UserModel)
  users: UserModel[];
}
