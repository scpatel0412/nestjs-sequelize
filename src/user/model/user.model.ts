import { ObjectType, Field } from '@nestjs/graphql';
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@ObjectType('User')
@Table({ modelName: 'users' })
export class UserModel extends Model<UserModel> {
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
    unique: true,
  })
  email: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
  })
  firstname: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
  })
  lastname: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
  })
  address1: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
  })
  address2: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
  })
  city: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
  })
  state: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
  })
  country: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Field(() => Boolean)
  @Column({
    type: DataType.BOOLEAN,
  })
  status: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
