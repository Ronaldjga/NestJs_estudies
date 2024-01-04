import { PrismaService } from 'src/databases/prisma.service';
import { User } from '../entity/user';
import { IUsersGateway } from './users-gateway-interface';
import { Injectable } from '@nestjs/common';
import { HashPassword } from 'src/services/hashPassword.service';
import { loginDto } from 'src/modules/auth/dto/login-dto';
import { MailService } from 'src/modules/mail/services/mail.service';

@Injectable()
export class UsersGatewayMysqlDatabase implements IUsersGateway {
  constructor(
    private prisma: PrismaService,
    private hashService: HashPassword,
    private mailService: MailService,
  ) {}

  async register(newUser: User): Promise<void> {
    const userAlreadyExists = await this.prisma.user.findFirst({
      where: {
        email: newUser.email,
      },
    });

    if (userAlreadyExists) {
      throw new Error('O Email já esta cadastrado');
    }

    const hashedPassword = await this.hashService.hashedPassword(
      newUser.password,
    );

    await Promise.all([
      await this.mailService.sendWelcome({
        user: newUser.username,
        email: newUser.email,
      }),
      await this.prisma.user.create({
        data: {
          username: newUser.username,
          email: newUser.email,
          password: hashedPassword,
        },
      }),
    ]);
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }

  async findById(id: string): Promise<User> {
    const targetUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return targetUser;
  }

  async findByUsername(username: string): Promise<User> {
    const targetUser = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return targetUser;
  }

  async deleteUser(user: loginDto): Promise<boolean> {
    const targetUser = await this.prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });

    const passwordVerify = await this.hashService.comparePassword(
      user.password,
      targetUser.password,
    );

    if (passwordVerify === false) {
      throw new Error('Senha incorreta');
    } else {
      try {
        await this.prisma.user.delete({
          where: {
            id: targetUser.id,
            username: targetUser.username,
            email: targetUser.email,
          },
        });
        console.log('deletou o usuario');
        return true;
      } catch (error) {
        console.log('deu erro ao deletar o usuario');
        throw new Error(error.message);
      }
    }
  }
}
