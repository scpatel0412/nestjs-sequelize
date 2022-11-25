import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from './user.model';

@ObjectType('Auth')
export class UserAuthModel {
  @Field(() => String)
  token: string;

  @Field(() => UserModel)
  user: UserModel;
}
