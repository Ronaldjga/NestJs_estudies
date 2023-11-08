import { PrismaService } from 'src/databases/prisma.service';
import { User } from "src/modules/users/entity/user";
import { authGatewayInterface } from "./auth-geteway-interface";
import { Injectable, Scope } from "@nestjs/common";
import { HashPassword } from "src/services/hashPassword.service";
import { UsersService } from "src/modules/users/services/users.service";
import { loginDto } from "../dto/login-dto";

@Injectable({
    scope: Scope.DEFAULT
})
export class AuthGetewayFromMysqlDatabase implements authGatewayInterface{
    constructor(
        private hashService: HashPassword,
        private prismaService: PrismaService
    ){}

    private currentUser: Omit<User, 'password'> | null = null


    async login(user: loginDto): Promise<Omit<User, "password">> {
        console.log(this.currentUser, 'usuario atual')
        if(this.currentUser != null){
            throw new Error("Já existe um usuario logado, faça o logout para logar com outro usuario")
        }
        const findUser = await this.prismaService.user.findUnique({
            where: {
                username: user.username
            }
        })
        
        if(findUser === null) {
            throw new Error("Falha em encontrar o usuario, verifique o nome de usuario e a senha")
        } else {
            const correctPassword = await this.hashService.comparePassword(user.password, findUser.password)
            if(correctPassword === true){
                this.currentUser = {
                    id: findUser.id,
                    username: findUser.username,
                    email: findUser.email
                }
                return this.currentUser
            } else {
                throw new Error("Senha incorretá")
            }            
        }
    }

    async logout(): Promise<boolean> {
        if(this.currentUser === null){
            throw new Error("Não há nenhum usuario logado")
        } else{
            this.currentUser = null
            return true
        }
    }

    async session(): Promise<Boolean | Omit<User, 'password'>> {
        const verifyCurrentUser = this.currentUser != null
        console.log(this.currentUser)
        if(verifyCurrentUser){
            return this.currentUser
        } else {
            return false
        }
    }

}