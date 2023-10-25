import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersGatewayInMemory } from '../users/geteway/users-gateway-in-memory';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersGatewayInMemory
  ],
})
export class AuthModule {}
