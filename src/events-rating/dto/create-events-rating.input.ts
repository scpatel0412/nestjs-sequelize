import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

@InputType()
export class CreateEventsRatingInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  rating_comment: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Field(() => Int)
  rating_number: number;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  event_id: string;
}
