import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCelestialPostInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  image: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  metatitle: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  metadescription: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  userId: string;
}
