import { Injectable } from "@nestjs/common";
import { ICreateUserDto } from "../dto/createUserDto";
import { User } from "../entity/user";
import { IAuthGateway } from "./auth-gateway-interface";
import { randomUUID } from "crypto";

@Injectable()
export class AuthGatewayInMemory implements IAuthGateway {
    private usersList: User[] = []

    async register(newUser: ICreateUserDto): Promise<void> {
        const user = new User(newUser.name, newUser.lastname, newUser.email)
        user.id = randomUUID()
        this.usersList.push(user)
    }

    async findAll(): Promise<User[]> {
        return this.usersList
    }

    async findById(id: string): Promise<User> {
        const targetUser = this.usersList.find(user => user.id === id)
        return targetUser
    }
    
}