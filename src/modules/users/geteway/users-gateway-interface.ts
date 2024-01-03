import { loginDto } from 'src/modules/auth/dto/login-dto';
import { User } from '../entity/user';

export interface IUsersGateway {
  register(newUser: User): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  deleteUser(user: loginDto): Promise<boolean>;
}
