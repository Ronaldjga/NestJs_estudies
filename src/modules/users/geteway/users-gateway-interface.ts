import { loginDto } from "src/modules/auth/dto/login-dto";
import { User } from "../entity/user";

export interface IUsersGateway {
    register(newUser: User): Promise<void>;
    findAll(): Promise<Omit<User, 'password'>[]>;
    findById(id: string): Promise<Omit<User, 'password'>>;
    findByUsername(username: string): Promise<Omit<User, 'password'>>;
    deleteUser(user: loginDto): Promise<boolean>;
}