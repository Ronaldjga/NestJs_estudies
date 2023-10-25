import { Module } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { UsersGatewayInMemory } from "./geteway/users-gateway-in-memory";
import { AuthController } from "./controllers/user.controller";
import { CreateUserPipe } from "./pipes/createUser.pipe";
import { UsersGuard } from "./guards/users.guard";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        UsersService,
        UsersGatewayInMemory,
        CreateUserPipe,
    ]
})
export class UsersModule {}