import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType('UserRoleCount')
export class UserRoleCountModel {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Field(() => Int)
  count: number;
}
