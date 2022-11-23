import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  id: string;

  // @IsIn(CreateUserInput)
  @Field(() => CreateUserInput)
  user: CreateUserInput;
}
