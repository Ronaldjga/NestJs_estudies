import { Injectable } from "@nestjs/common";
import { ICreateUserDto } from "../dto/create-user-dto";
import { User } from "../entity/user";
import { IUsersGateway } from "./users-gateway-interface";
import { randomUUID } from "crypto";
import { HashPassword } from "src/services/hashPassword.service";

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
    
}