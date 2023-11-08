import { AuthGetewayFromMysqlDatabase } from './../geteway/auth-geteway-from-mysql-database';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(AuthGetewayFromMysqlDatabase)
        private readonly authGetewayFromMysqlDatabase : AuthGetewayFromMysqlDatabase
    ){}

    async canActivate(context: ExecutionContext) {
        const authVerify = await this.authGetewayFromMysqlDatabase.session()
        console.log(authVerify, 'logando no guard, verificando se tem login')
        if(authVerify === false){
            throw new UnauthorizedException()
        } else {
            return true
        }
    }
    
}