import { ObjectType, Field } from '@nestjs/graphql';
import {
  BelongsTo,
  BelongsToMany,
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
import { CelestialPostModel } from 'src/celestial-post/model/celestial-post.model';
import { EventsModel } from 'src/events/model/events.model';
import { UsersEventsModel } from 'src/events/model/users-events.model';
import { UserRolesModel } from 'src/user-roles/model/user-roles.model';

@Scopes({
  celestialPosts: () => {
    return {
      include: {
        model: CelestialPostModel,
        as: 'celestialPosts',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  event_created: () => {
    return {
      include: {
        model: EventsModel,
        as: 'event_created',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  events_enroll: () => {
    return {
      include: {
        model: EventsModel,
        as: 'events_enroll',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  usersRole: () => {
    return {
      include: {
        model: UserRolesModel,
        as: 'usersRole',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
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

  @ForeignKey(() => UserRolesModel)
  @Column({ field: 'user_role_id' })
  userRoleId: string;

  @Field(() => UserRolesModel, { nullable: true })
  @BelongsTo(() => UserRolesModel)
  usersRole: UserRolesModel;

  @Field(() => [CelestialPostModel], { nullable: true })
  @HasMany(() => CelestialPostModel)
  celestialPosts: CelestialPostModel[];

  @Field(() => [EventsModel], { nullable: true })
  @HasMany(() => EventsModel)
  event_created: EventsModel[];

  @Field(() => [EventsModel], { nullable: true })
  @BelongsToMany(() => EventsModel, () => UsersEventsModel)
  events_enroll: EventsModel[];
}
