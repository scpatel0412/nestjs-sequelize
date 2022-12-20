import { Field, ObjectType } from '@nestjs/graphql';
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
import { UserModel } from 'src/user/model/user.model';
import { UsersEventsModel } from './users-events.model';
import { EventSubTypesModel } from 'src/event-sub-types/model/event-sub-types.model';

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
  user_events: () => {
    return {
      include: {
        model: UserModel,
        as: 'user_events',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  event_sub_types: () => {
    return {
      include: {
        model: EventSubTypesModel,
        as: 'event_sub_types',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@ObjectType('Events')
@Table({ modelName: 'events' })
export class EventsModel extends Model<EventsModel> {
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
  description: string;

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
  city: string;

  @Field(() => Boolean)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  status: boolean;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  contact: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Field(() => Date)
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  event_date: Date;

  @Field(() => String)
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  event_time: string;

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id' })
  userId: string;

  @Field(() => UserModel)
  @BelongsTo(() => UserModel)
  users: UserModel;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @Field(() => [UserModel])
  @BelongsToMany(() => UserModel, () => UsersEventsModel)
  user_events: UserModel[];

  @ForeignKey(() => EventSubTypesModel)
  @Column({ field: 'event_sub_types_id' })
  eventSubTypesId: string;

  @Field(() => EventSubTypesModel, { nullable: true })
  @BelongsTo(() => EventSubTypesModel)
  event_sub_types: EventSubTypesModel;
}
