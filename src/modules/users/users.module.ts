import { Module } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { UsersGatewayInMemory } from "./geteway/users-gateway-in-memory";
import { AuthController } from "./controllers/user.controller";
import { CreateUserPipe } from "./pipes/createUser.pipe";
import { UsersGatewayMysqlDatabase } from "./geteway/users-gateway-mysql-database";
import { PrismaService } from "src/databases/prisma.service";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        UsersService,
        UsersGatewayInMemory,
        CreateUserPipe,
        UsersGatewayMysqlDatabase,
        PrismaService
    ]
})
export class UsersModule {}