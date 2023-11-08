import { User } from 'src/modules/users/entity/user';
import { loginDto } from './../dto/login-dto';

export interface authGatewayInterface {
    login(user: loginDto): Promise<Omit<User, 'password'>>;
    logout(): Promise<boolean>;
    session(): Promise<Boolean | Omit<User, 'password'>>
}