import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PostLike {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
