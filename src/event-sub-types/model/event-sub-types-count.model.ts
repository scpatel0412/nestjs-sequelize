import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType('EventSubTypesCount')
export class EventSubTypesCount {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Field(() => Int)
  count: number;
}
