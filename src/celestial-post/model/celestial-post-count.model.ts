import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('CelestialPostCount')
export class CelestialPostCountModel {
  @Field(() => Int)
  count: number;
}
