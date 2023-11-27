import { User } from 'src/modules/users/entity/user';
import { loginDto } from './../dto/login-dto';

export interface authGatewayInterface {
    sigIn(user: loginDto): Promise<{access_token: string}>;
    logout(): Promise<boolean>;
    session(): Promise<Boolean | Omit<User, 'password'>>;
    deleteUser(user: loginDto): Promise<boolean>
}