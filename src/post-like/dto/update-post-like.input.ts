import { CreatePostLikeInput } from './create-post-like.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostLikeInput extends PartialType(CreatePostLikeInput) {
  @Field(() => Int)
  id: number;
}
