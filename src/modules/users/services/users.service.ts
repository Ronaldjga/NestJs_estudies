import { ICreateUserDto } from '../dto/create-user-dto';
import { User } from '../entity/user';
import { UsersGatewayInMemory } from '../geteway/users-gateway-in-memory';
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
    constructor(
        @Inject(UsersGatewayInMemory)
        private authGatewayInMemory: UsersGatewayInMemory
    ){}

    async create(userCreateDto: ICreateUserDto) {
        const user = new User(userCreateDto.name, userCreateDto.lastname, userCreateDto.email, userCreateDto.password)
        await this.authGatewayInMemory.register(user)
        return user
    }

    async findAll() {
        return this.authGatewayInMemory.findAll()
    }

    async findById(id: string) {
        return this.authGatewayInMemory.findById(id)
    }
}