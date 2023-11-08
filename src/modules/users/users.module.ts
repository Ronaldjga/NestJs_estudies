import { Module } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { UsersGatewayInMemory } from "./geteway/users-gateway-in-memory";
import { UsersController } from "./controllers/user.controller";
import { CreateUserPipe } from "./pipes/createUser.pipe";
import { UsersGatewayMysqlDatabase } from "./geteway/users-gateway-mysql-database";
import { PrismaService } from "src/databases/prisma.service";
import { HashPassword } from "src/services/hashPassword.service";
import { AuthModule } from "../auth/auth.module";
import { AuthGetewayFromMysqlDatabase } from "../auth/geteway/auth-geteway-from-mysql-database";

@Module({
    imports: [AuthModule],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersGatewayInMemory,
        CreateUserPipe,
        UsersGatewayMysqlDatabase,
        PrismaService,
        HashPassword,
    ]
})
export class UsersModule {}