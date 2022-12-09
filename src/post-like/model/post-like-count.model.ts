import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType('PostLikeCount')
export class PostLikeCountModel {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  count: number;
}
