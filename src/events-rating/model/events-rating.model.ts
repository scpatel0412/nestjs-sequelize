import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { EventsModel } from 'src/events/model/events.model';
import { UserModel } from 'src/user/model/user.model';

@Scopes({
  rated_user: () => {
    return {
      include: {
        model: UserModel,
        as: 'rated_user',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  rated_events: () => {
    return {
      include: {
        model: EventsModel,
        as: 'rated_events',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@ObjectType('EventsRatingModel')
@Table({ modelName: 'event_ratings' })
export class EventsRatingModel extends Model<EventsRatingModel> {
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
    type: DataType.TEXT,
    allowNull: false,
  })
  rating_comment: string;

  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rating_number: number;

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

  @ForeignKey(() => EventsModel)
  @Column({ field: 'event_id' })
  event_id: string;

  @Field(() => EventsModel, { nullable: true })
  @BelongsTo(() => EventsModel)
  rated_events: EventsModel;

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id' })
  user_id: string;

  @Field(() => UserModel, { nullable: true })
  @BelongsTo(() => UserModel)
  rated_user: UserModel;
}
