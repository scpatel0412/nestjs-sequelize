import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType('PostCommentCount')
export class PostCommentCountModel {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  count: number;
}
