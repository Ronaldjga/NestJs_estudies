import { PrismaService } from "src/databases/prisma.service";
import { User } from "../entity/user";
import { IUsersGateway } from "./users-gateway-interface";
import { Injectable } from "@nestjs/common";
import { HashPassword } from "src/services/hashPassword.service";
import { loginDto } from "src/modules/auth/dto/login-dto";

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

    async findByUsername(username: string): Promise<Omit<User, "password">> {
        const targetUser = await this.prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        })

        return targetUser
    }

    async deleteUser(user: loginDto): Promise<boolean> {
        const targetUser = await this.prisma.user.findUnique({
            where: {
                username: user.username
            }
        })
   
        if(targetUser === null){
            throw new Error("Usuario não foi encontrado")
        } 

        const passwordVerify = await this.hashService.comparePassword(user.password, targetUser.password)

        if(passwordVerify === false){
            throw new Error("Senha incorreta")
        } else {
            try{
                const deleteUserProcess = await this.prisma.user.delete({
                    where: {
                        id: targetUser.id,
                        username: targetUser.username,
                        email: targetUser.email
                    }
                })
                return true
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }

}