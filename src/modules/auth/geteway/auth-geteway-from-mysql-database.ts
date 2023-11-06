import { User } from "src/modules/users/entity/user";
import { authGatewayInterface } from "./auth-geteway-interface";
import { Injectable } from "@nestjs/common";
import { HashPassword } from "src/services/hashPassword.service";
import { UsersService } from "src/modules/users/services/users.service";
import { loginDto } from "../dto/login-dto";

@Injectable()
export class AuthGetewayFromMysqlDatabase implements authGatewayInterface{
    constructor(
        private hashService: HashPassword,
        private userService: UsersService
    ){}

    private currentUser: Omit<User, 'password'> = {
        id: '',
        username: '',
        email: ''
    }

    async login(user: loginDto): Promise<Omit<User, "password">> {
        return this.currentUser
    }

}