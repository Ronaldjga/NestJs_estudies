import { PrismaService } from "src/databases/prisma.service";
import { User } from "../entity/user";
import { IUsersGateway } from "./users-gateway-interface";
import { Injectable } from "@nestjs/common";
import { HashPassword } from "src/services/hashPassword.service";

@Injectable()
export class UsersGatewayMysqlDatabase implements IUsersGateway{
    constructor(
        private prisma : PrismaService,
        private hashService : HashPassword
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
        
        const hashedPassword = await this.hashService.hashedPassword(newUser.password)

        const registerUser = await this.prisma.user.create({
            data: {
                username: newUser.username,
                email: newUser.email,
                password: hashedPassword
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

    async findById(id: string): Promise<Omit<User, 'password'>> {
        const targetUser = await this.prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        })

        return targetUser
    }

}