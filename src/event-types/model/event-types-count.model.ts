import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType('EventTypesCount')
export class EventTypesCountModel {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Field(() => Int)
  count: number;
}
