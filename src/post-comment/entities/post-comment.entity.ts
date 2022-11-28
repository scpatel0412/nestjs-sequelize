import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PostComment {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
