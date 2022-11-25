import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CelestialPost {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
