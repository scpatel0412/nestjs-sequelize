import { Test, TestingModule } from '@nestjs/testing';
import { UserRolesResolver } from './user-roles.resolver';
import { UserRolesService } from './user-roles.service';

describe('UserRolesResolver', () => {
  let resolver: UserRolesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRolesResolver, UserRolesService],
    }).compile();

    resolver = module.get<UserRolesResolver>(UserRolesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
