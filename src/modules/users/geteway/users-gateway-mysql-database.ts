import { PrismaService } from "src/databases/prisma.service";
import { User } from "../entity/user";
import { IUsersGateway } from "./users-gateway-interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersGatewayMysqlDatabase implements IUsersGateway{
    constructor(
        private prisma : PrismaService
    ){}

    async register(newUser: User): Promise<void> {
        const userAlreadyExists = await this.prisma.user.findFirst({
            where: {
                email: newUser.email
            }
        })

        if(userAlreadyExists) {
            throw new Error('O Email já esta cadastrado')
        }
        
        const registerUser = await this.prisma.user.create({
            data: {
                username: newUser.username,
                email: newUser.email,
                password: newUser.password
            }
        })
    }
    async findAll(): Promise<Omit<User, "password">[]> {
        const allUsers = await this.prisma.user.findMany({
            select:{
                id: true,
                username: true,
                email: true
            }
        })
        return allUsers
    }

    async findById(id: string): Promise<User> {
        const targetUser = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return targetUser
    }

}