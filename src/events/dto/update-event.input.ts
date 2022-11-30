import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean, IsDateString } from 'class-validator';

@InputType()
export class UpdateEventInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  image: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  city: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  address: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  country: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  state: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  contact: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  @Field(() => Date)
  event_date: Date;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  event_time: string;
}
