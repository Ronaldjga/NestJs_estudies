import { User } from 'src/modules/users/entity/user';
import { authGatewayInterface } from './auth-geteway-interface';
import { Injectable, Scope } from '@nestjs/common';
import { HashPassword } from 'src/services/hashPassword.service';
import { loginDto } from '../dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable({
  scope: Scope.DEFAULT,
})
export class AuthGetewayFromMysqlDatabase implements authGatewayInterface {
  constructor(
    private hashService: HashPassword,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private currentUser: Omit<User, 'password'> | null = null;

  async sigIn(user: loginDto): Promise<{ access_token: string }> {
    console.log(this.currentUser, 'usuario atual');
    if (this.currentUser != null) {
      throw new Error(
        'Já existe um usuario logado, faça o logout para logar com outro usuario',
      );
    }
    const findUser = await this.usersService.findUserByIdOrUsername(
      user.username,
    );

    if (findUser === null) {
      throw new Error(
        'Falha em encontrar o usuario, verifique o nome de usuario e a senha',
      );
    } else {
      const correctPassword = await this.hashService.comparePassword(
        user.password,
        findUser.password,
      );
      if (correctPassword) {
        const payload = {
          sub: findUser.id,
          username: findUser.username,
          email: findUser.email,
        };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new Error('Senha incorretá');
      }
    }
  }

  async logout(): Promise<boolean> {
    if (this.currentUser === null) {
      throw new Error('Não há nenhum usuario logado');
    } else {
      this.currentUser = null;
      return true;
    }
  }

  async session(): Promise<boolean | Omit<User, 'password'>> {
    const verifyCurrentUser = this.currentUser != null;
    console.log(this.currentUser);
    if (verifyCurrentUser) {
      return this.currentUser;
    } else {
      return false;
    }
  }

  async deleteUser(user: loginDto): Promise<boolean> {
    const deleteUserProcess = await this.usersService.deleteUser(user);
    if (deleteUserProcess) {
      return true;
    } else {
      throw new Error('Erro ao excluir o usuario');
    }
  }
}
