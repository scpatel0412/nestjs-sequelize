import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './model/user.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), AuthModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
