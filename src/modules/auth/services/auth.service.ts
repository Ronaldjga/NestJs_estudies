import { AuthGetewayFromMysqlDatabase } from './../geteway/auth-geteway-from-mysql-database';
import { Injectable } from '@nestjs/common';
import { loginDto } from '../dto/login-dto';

@Injectable()
export class AuthService {
    constructor(
        private authGetewayFromMysqlDatabase: AuthGetewayFromMysqlDatabase
    ){}

    async login(user: loginDto){
        const loginProcess = await this.authGetewayFromMysqlDatabase.login(user)
        return loginProcess
    }

    async logout() {
        const logoutProcess = await this.authGetewayFromMysqlDatabase.logout()
        return logoutProcess
    }
}
