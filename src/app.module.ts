import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './databases/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './modules/mail/mail.module';

@Global()
@Module({
  imports: [
    UsersModule,
    AuthModule,
    MailModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
