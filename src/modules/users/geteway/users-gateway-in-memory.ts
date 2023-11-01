import { Injectable } from "@nestjs/common";
import { ICreateUserDto } from "../dto/create-user-dto";
import { User } from "../entity/user";
import { IUsersGateway } from "./users-gateway-interface";
import { randomUUID } from "crypto";

@Injectable()
export class UsersGatewayInMemory implements IUsersGateway {
    private usersList: User[] = []

    async register(newUser: ICreateUserDto): Promise<void> {
        const user = new User(newUser.username, newUser.email, newUser.password)
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

    async findById(id: string): Promise<User> {
        const targetUser = this.usersList.find(user => user.id === id ? {
            id: user.id,
            username: user.username,
            email: user.email
        } : [])
        return targetUser
    }
    
}