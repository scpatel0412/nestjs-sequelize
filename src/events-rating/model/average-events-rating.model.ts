import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType('AverageEventsRatingModel')
export class AverageEventsRatingModel {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  avg_rating: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  five_star: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  four_star: string;

  @IsNotEmpty()
  @Field(() => String)
  three_star: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  two_star: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  one_star: string;
}
