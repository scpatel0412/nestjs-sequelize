import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class EventsRating {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
