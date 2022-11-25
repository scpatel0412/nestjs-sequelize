import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserModel } from './model/user.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';
import { UserAuthModel } from './model/user-auth.model';
import { UserCountModel } from './model/user-count.model';
import { UserResetPasswordModel } from './model/user-reset-password.model';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @AllowUnauthorized()
  @Mutation(() => UserModel)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @AllowUnauthorized()
  @Query(() => [UserModel])
  getUsers() {
    return this.userService.getUsers();
  }

  @AllowUnauthorized()
  @Query(() => UserModel)
  getUser(@Args('id') id: string) {
    return this.userService.getUser(id);
  }

  @AllowUnauthorized()
  @Mutation(() => UserModel)
  updateUser(
    @Args('id') id: string,
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return this.userService.updateUser(id, createUserInput);
  }

  @AllowUnauthorized()
  @Mutation(() => UserModel)
  deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @AllowUnauthorized()
  @Mutation(() => UserAuthModel)
  signIn(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.signIn(email, password);
  }

  @AllowUnauthorized()
  @Query(() => UserCountModel)
  userCount() {
    return this.userService.userCount();
  }

  @AllowUnauthorized()
  @Mutation(() => UserResetPasswordModel)
  resetPassword(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.userService.resetPassword(email, password);
  }
}
