import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class EventSubType {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
