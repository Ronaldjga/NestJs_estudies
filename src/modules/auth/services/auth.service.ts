import { AuthGetewayFromMysqlDatabase } from './../geteway/auth-geteway-from-mysql-database';
import { Inject, Injectable } from '@nestjs/common';
import { loginDto } from '../dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthGetewayFromMysqlDatabase)
    private authGetewayFromMysqlDatabase: AuthGetewayFromMysqlDatabase,
  ) {}

  async login(user: loginDto) {
    const loginProcess = await this.authGetewayFromMysqlDatabase.sigIn(user);
    return loginProcess;
  }

  async logout() {
    const logoutProcess = await this.authGetewayFromMysqlDatabase.logout();
    return logoutProcess;
  }

  async deleteUser(user: loginDto) {
    const deleteUserProcess =
      await this.authGetewayFromMysqlDatabase.deleteUser(user);
    return deleteUserProcess;
  }
}
