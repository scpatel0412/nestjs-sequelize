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
import { EventTypesModel } from 'src/event-types/model/event-types.model';
import { EventsModel } from 'src/events/model/events.model';

@Scopes({
  event_types: () => {
    return {
      include: {
        model: EventTypesModel,
        as: 'event_types',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
  events_sub_types_events: () => {
    return {
      include: {
        model: EventsModel,
        as: 'events_sub_types_events',
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    };
  },
})
@ObjectType('EventSubTypes')
@Table({ modelName: 'event_sub_types' })
export class EventSubTypesModel extends Model<EventSubTypesModel> {
  @Field(() => String)
  @Column({
    type: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
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
  image: string;

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
  meta_title: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  meta_description: string;

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

  @ForeignKey(() => EventTypesModel)
  @Column({ field: 'event_types_id' })
  eventTypesId: string;

  @Field(() => EventTypesModel)
  @BelongsTo(() => EventTypesModel)
  event_types: EventTypesModel;

  @Field(() => [EventsModel], { nullable: true })
  @HasMany(() => EventsModel)
  events_sub_types_events: EventsModel[];
}
