import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('UserCount')
export class UserCountModel {
  @Field(() => Int)
  count: number;
}
