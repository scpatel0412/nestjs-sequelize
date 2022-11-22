import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserModel } from './model/user.model';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    private sequelize: Sequelize,
  ) {}

  public async createUser(user: CreateUserInput): Promise<UserModel> {
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

  public async getUsers(): Promise<Array<UserModel>> {
    const user = await this.userModel.findAll();
    return user;
  }

  public async getUser(id: string): Promise<UserModel> {
    const user = await this.userModel.findOne({ where: { id } });
    return user;
  }

  private hashPassword(pwd: string): string {
    return crypto
      .createHash('sha256')
      .update(`${pwd}5hEidaaO7UyO15DC59qpViU5RmuIBrX8YC7jd3thEtw7WCQTx88PveS`)
      .digest('base64');
  }

  public normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
}
