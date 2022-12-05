import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleInput } from './dto/create-user-role.input';
import { UpdateUserRoleInput } from './dto/update-user-role.input';
import { UserRolesModel } from './model/user-roles.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';
import { UserRoleCountModel } from './model/user-role-count.model';

@Resolver(() => UserRolesModel)
export class UserRolesResolver {
  constructor(private readonly userRolesService: UserRolesService) {}

  @AllowUnauthorized()
  @Mutation(() => UserRolesModel)
  createUserRoles(
    @Args('createUserRoleInput') createUserRoleInput: CreateUserRoleInput,
  ) {
    return this.userRolesService.createUserRoles(createUserRoleInput);
  }

  @AllowUnauthorized()
  @Mutation(() => UserRolesModel)
  updateUserRoles(
    @Args('id') id: string,
    @Args('updateUserRoleInput') updateUserRoleInput: UpdateUserRoleInput,
  ) {
    return this.userRolesService.updateUserRoles(id, updateUserRoleInput);
  }

  @AllowUnauthorized()
  @Mutation(() => UserRolesModel)
  deleteUserRoles(@Args('id') id: string) {
    return this.userRolesService.deleteUserRoles(id);
  }

  @AllowUnauthorized()
  @Query(() => UserRolesModel)
  getUserRole(@Args('id') id: string) {
    return this.userRolesService.getUserRole(id);
  }

  @AllowUnauthorized()
  @Query(() => [UserRolesModel])
  getUserRoles() {
    return this.userRolesService.getUserRoles();
  }

  @AllowUnauthorized()
  @Query(() => UserRoleCountModel)
  countUserRoles() {
    return this.userRolesService.countUserRoles();
  }
}
