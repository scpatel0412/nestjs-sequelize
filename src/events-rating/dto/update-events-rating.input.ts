import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateEventsRatingInput {
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
}
