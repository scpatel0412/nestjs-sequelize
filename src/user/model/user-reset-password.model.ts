import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UserResetPassword')
export class UserResetPasswordModel {
  @Field(() => String)
  message: string;

  @Field(() => Boolean)
  change: boolean;
}
