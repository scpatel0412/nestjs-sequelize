import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class EventType {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
