import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

@InputType()
export class UpdateEventSubTypeInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  value_info: string;

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
  image: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  meta_title: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  meta_description: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;
}
