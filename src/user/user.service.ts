import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateUserInput } from './dto/create-user.input';
import { UserModel } from './model/user.model';
import * as crypto from 'crypto';
import { AuthService } from 'src/auth/auth.service';
import { UserAuthModel } from './model/user-auth.model';
import { UserCountModel } from './model/user-count.model';
import { UserResetPasswordModel } from './model/user-reset-password.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    private authService: AuthService,
    private sequelize: Sequelize,
    private readonly configService: ConfigService,
  ) {}

  public async createUser(user: CreateUserInput): Promise<UserModel> {
    const emailCheck = this.normalizeEmail(user.email);
    const findUser = await this.userModel.findOne({
      where: { email: emailCheck },
    });
    if (findUser) {
      throw new ConflictException(`${emailCheck} already exists`);
    } else {
      console.log(user);
      const user1 = new UserModel();
      user1.email = this.normalizeEmail(user.email);
      user1.firstname = user.firstname;
      user1.lastname = user.lastname;
      user1.username = user.username;
      user1.password = this.hashPassword(user.password);
      user1.state = user.state;
      user1.status = user.status;
      user1.city = user.city;
      user1.country = user.country;
      user1.address1 = user.address1;
      user1.address2 = user.address2;
      const userContent = await this.userModel.create(user1.dataValues);
      return userContent;
    }
  }

  public async getUsers(): Promise<Array<UserModel>> {
    const user = await this.userModel
      .scope([{ method: ['celestialPosts'] }])
      .findAll();
    return user;
  }

  public async getUser(id: string): Promise<UserModel> {
    const user = await this.userModel
      .scope([{ method: ['celestialPosts'] }])
      .findOne({ where: { id } });
    return user;
  }

  public async updateUser(
    id: string,
    user: CreateUserInput,
  ): Promise<UserModel> {
    const userInput = await this.userModel.findOne({ where: { id } });
    if (!userInput) {
      throw new NotFoundException(`user with ${id} not found`);
    } else {
      userInput.email = this.normalizeEmail(user.email);
      userInput.firstname = user.firstname;
      userInput.lastname = user.lastname;
      userInput.username = user.username;
      userInput.password = this.hashPassword(user.password);
      userInput.state = user.state;
      userInput.status = user.status;
      userInput.city = user.city;
      userInput.country = user.country;
      userInput.address1 = user.address1;
      userInput.address2 = user.address2;

      const a = await this.userModel.update(userInput.dataValues, {
        where: { id },
      });
      return userInput;
    }
  }

  public async signIn(email: string, password: string): Promise<UserAuthModel> {
    const pass = this.hashPassword(password);
    const user = await this.userModel.findOne({
      where: { email, password: pass },
    });
    console.log('user', user);
    if (!user) {
      throw new NotFoundException(`${email} not found`);
    } else {
      const token = await this.authService.createAccessToken({
        sub: user.id,
        email: user.email,
      });
      return { user, token };
    }
  }

  public async userCount(): Promise<UserCountModel> {
    const count = await this.userModel.count();
    const count1 = new UserCountModel();
    count1.count = count;
    return count1;
  }

  public async deleteUser(id: string): Promise<UserModel> {
    const userDetails = await this.userModel.findOne({ where: { id } });
    if (!userDetails) {
      throw new NotFoundException(`user with ${id} not found`);
    } else {
      await this.userModel.destroy({ where: { id } });
      return userDetails;
    }
  }

  public async resetPassword(
    email: string,
    password: string,
  ): Promise<UserResetPasswordModel> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`${email} not found`);
    } else {
      const reset = this.hashPassword(password);
      user.password = reset;
      await user.save();
      const message = new UserResetPasswordModel();
      message.message = 'Password changed successfully';
      message.change = true;
      return message;
    }
  }

  private hashPassword(pwd: string): string {
    return crypto
      .createHash('sha256')
      .update(`${pwd}${this.configService.get<string>('SALT')}`)
      .digest('base64');
  }

  public normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
}
