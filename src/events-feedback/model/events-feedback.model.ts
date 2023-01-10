import { Field, ObjectType } from '@nestjs/graphql';
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
  feedback_user: () => {
    return {
      include: {
        model: UserModel,
        as: 'feedback_user',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  feedback_events: () => {
    return {
      include: {
        model: EventsModel,
        as: 'feedback_events',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@ObjectType('EventsFeedbackModel')
@Table({ modelName: 'event_feedbacks' })
export class EventsFeedbackModel extends Model<EventsFeedbackModel> {
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
  title: string;

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

  @ForeignKey(() => EventsModel)
  @Column({ field: 'event_id' })
  event_id: string;

  @Field(() => EventsModel, { nullable: true })
  @BelongsTo(() => EventsModel)
  feedback_events: EventsModel;

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id' })
  user_id: string;

  @Field(() => UserModel, { nullable: true })
  @BelongsTo(() => UserModel)
  feedback_user: UserModel;
}
