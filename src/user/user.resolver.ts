import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserModel } from './model/user.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';

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
}
