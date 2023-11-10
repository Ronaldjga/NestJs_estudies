import { Module } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { UsersGatewayInMemory } from "./geteway/users-gateway-in-memory";
import { UsersController } from "./controllers/user.controller";
import { CreateUserPipe } from "./pipes/createUser.pipe";
import { UsersGatewayMysqlDatabase } from "./geteway/users-gateway-mysql-database";
import { PrismaService } from "src/databases/prisma.service";
import { HashPassword } from "src/services/hashPassword.service";

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersGatewayInMemory,
        CreateUserPipe,
        UsersGatewayMysqlDatabase,
        PrismaService,
        HashPassword,
    ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}