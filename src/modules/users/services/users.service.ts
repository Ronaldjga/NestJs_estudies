import { ICreateUserDto } from '../dto/create-user-dto';
import { User } from '../entity/user';
import { UsersGatewayInMemory } from '../geteway/users-gateway-in-memory';
import { Inject, Injectable } from '@nestjs/common';
import { UsersGatewayMysqlDatabase } from '../geteway/users-gateway-mysql-database';
import { loginDto } from 'src/modules/auth/dto/login-dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersGatewayInMemory)
    private usersGatewayInMemory: UsersGatewayInMemory,
    @Inject(UsersGatewayMysqlDatabase)
    private usersGatewayMysqlDatabase: UsersGatewayMysqlDatabase,
  ) {}

  async create(userCreateDto: ICreateUserDto) {
    const user = new User(
      userCreateDto.username,
      userCreateDto.email,
      userCreateDto.password,
    );
    await this.usersGatewayInMemory.register(user);
    await this.usersGatewayMysqlDatabase.register(user);
    return user;
  }

  async findAll() {
    return await this.usersGatewayMysqlDatabase.findAll();
  }

  async findUserByIdOrUsername(idOrUsername: string) {
    const findUserByUsernameInDatabse =
      await this.usersGatewayMysqlDatabase.findByUsername(idOrUsername);
    const findUserByIdInDatabase =
      await this.usersGatewayMysqlDatabase.findById(idOrUsername);
    return findUserByUsernameInDatabse || findUserByIdInDatabase;
  }

  async deleteUser(user: loginDto) {
    const deletedUser = await this.usersGatewayMysqlDatabase.deleteUser(user);
    await this.usersGatewayInMemory.deleteUser(user);
    return deletedUser;
  }
}
