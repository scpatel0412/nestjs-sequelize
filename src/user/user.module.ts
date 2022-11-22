import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './model/user.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
