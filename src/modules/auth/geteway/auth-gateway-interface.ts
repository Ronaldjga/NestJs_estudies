import { ICreateUserDto } from "../dto/createUserDto";
import { User } from "../entity/user";

export interface IAuthGateway {
    register(newUser: User): Promise<void>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>
}