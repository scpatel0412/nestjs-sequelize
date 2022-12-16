import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateEventTypeInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  value_info: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;
}
