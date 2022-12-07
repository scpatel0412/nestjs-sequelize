import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @Field(() => String)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  address1: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  address2: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  city: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  state: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  country: string;

  @IsNotEmpty()
  @MinLength(6)
  @Field(() => String)
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  userRoleId: string;
}
