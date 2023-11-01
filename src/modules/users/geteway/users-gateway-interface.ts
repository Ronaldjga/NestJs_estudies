import { User } from "../entity/user";

export interface IUsersGateway {
    register(newUser: User): Promise<void>;
    findAll(): Promise<Omit<User, 'password'>[]>;
    findById(id: string): Promise<User>
}