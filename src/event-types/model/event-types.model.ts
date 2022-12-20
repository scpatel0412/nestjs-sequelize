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
import { EventSubTypesModel } from 'src/event-sub-types/model/event-sub-types.model';

@Scopes({
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
@ObjectType('EventTypes')
@Table({ modelName: 'event_types' })
export class EventTypesModel extends Model<EventTypesModel> {
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

  @Field(() => [EventSubTypesModel], { nullable: true })
  @HasMany(() => EventSubTypesModel)
  event_sub_types: EventSubTypesModel[];
}
