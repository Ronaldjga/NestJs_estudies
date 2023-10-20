import { ICreateUserDto } from '../dto/createUserDto';
import { User } from '../entity/user';
import { AuthGatewayInMemory } from './../geteway/auth-gateway-in-memory';
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(
        @Inject(AuthGatewayInMemory)
        private authGatewayInMemory: AuthGatewayInMemory
    ){}

    async create(userCreateDto: ICreateUserDto) {
        const user = new User(userCreateDto.name, userCreateDto.lastname, userCreateDto.email)
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