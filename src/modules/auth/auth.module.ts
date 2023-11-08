import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthGetewayFromMysqlDatabase } from './geteway/auth-geteway-from-mysql-database';
import { HashPassword } from 'src/services/hashPassword.service';
import { PrismaService } from 'src/databases/prisma.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGetewayFromMysqlDatabase,
    HashPassword,
    PrismaService,
    AuthGuard
  ],
  exports: [
    AuthGuard,
    AuthGetewayFromMysqlDatabase
  ]
})
export class AuthModule {}
