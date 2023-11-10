import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthGetewayFromMysqlDatabase } from './geteway/auth-geteway-from-mysql-database';
import { HashPassword } from 'src/services/hashPassword.service';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '60s'}
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGetewayFromMysqlDatabase,
    HashPassword,
    AuthGuard
  ]
})
export class AuthModule {}
