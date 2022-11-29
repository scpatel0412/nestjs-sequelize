import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUsersEventsInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  eventId: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  is_active: boolean;
}
