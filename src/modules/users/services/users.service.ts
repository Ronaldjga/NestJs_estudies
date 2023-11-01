import { ICreateUserDto } from '../dto/create-user-dto';
import { User } from '../entity/user';
import { UsersGatewayInMemory } from '../geteway/users-gateway-in-memory';
import { Inject, Injectable } from "@nestjs/common";
import { UsersGatewayMysqlDatabase } from '../geteway/users-gateway-mysql-database';

@Injectable()
export class UsersService {
    constructor(
        @Inject(UsersGatewayInMemory)
        private authGatewayInMemory: UsersGatewayInMemory ,
        @Inject(UsersGatewayMysqlDatabase)
        private usersGatewayMysqlDatabase : UsersGatewayMysqlDatabase
    ){}

    async create(userCreateDto: ICreateUserDto) {
        const user = new User(userCreateDto.username, userCreateDto.email, userCreateDto.password)
        await this.authGatewayInMemory.register(user)
        await this.usersGatewayMysqlDatabase.register(user)
        return user
    }

    async findAll() {
        return await this.usersGatewayMysqlDatabase.findAll()
    }

    async findById(id: string) {
        return await this.usersGatewayMysqlDatabase.findById(id)
    }
}