import { Injectable } from "@nestjs/common";
import { ICreateUserDto } from "../dto/create-user-dto";
import { User } from "../entity/user";
import { IUsersGateway } from "./users-gateway-interface";
import { randomUUID } from "crypto";
import { HashPassword } from "src/services/hashPassword.service";
import { loginDto } from "src/modules/auth/dto/login-dto";

@Injectable()
export class UsersGatewayInMemory implements IUsersGateway {
    constructor(
        private hashService: HashPassword
    ){}
    private usersList: User[] = []

    async register(newUser: ICreateUserDto): Promise<void> {
        const userAlreadyExists = this.usersList.some(userData => userData.email === newUser.email || userData.username == newUser.username)
        if(userAlreadyExists){
            throw new Error('O Email já esta cadastrado')
        }

        const hashedpassword = await this.hashService.hashedPassword(newUser.password)

        const user = new User(newUser.username, newUser.email, hashedpassword)
        user.id = randomUUID()
        this.usersList.push(user)
    }

    async findAll(): Promise<Omit<User, 'password'>[]> {
        const allUsers = this.usersList.map(user => {
            return {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })
        return allUsers
    }

    async findById(id: string): Promise<Omit<User, 'password'>> {
        const targetUser = this.usersList.find(user => user.id === id ? {
            id: user.id,
            username: user.username,
            email: user.email
        } : [])
        return targetUser
    }

    async findByUsername(username: string): Promise<Omit<User, "password">> {
        const targetUser = this.usersList.find(user => user.username === username ? {
            id: user.id,
            username: user.username,
            email: user.email
        } : [])

        return targetUser
    }
    
    async deleteUser(user: loginDto): Promise<boolean> {
        const targetUser = this.usersList.find(userFromUserList => userFromUserList.username === user.username)
        if(targetUser === null){
            throw new Error("Usuario não encontrado")
        }

        const passwordVerify = await this.hashService.comparePassword(user.password, targetUser.password)

        if(passwordVerify === false){
            throw new Error("Senha incorreta")
        } else {
            const newUserList = this.usersList.filter(userFromUserList => userFromUserList.id != targetUser.id && userFromUserList.username != targetUser.username && userFromUserList.email != targetUser.email)
            this.usersList = newUserList
            return true
        }
    }

}