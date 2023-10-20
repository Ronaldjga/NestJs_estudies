import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthGatewayInMemory } from "./geteway/auth-gateway-in-memory";
import { AuthController } from "./controllers/auth.controller";
import { CreateUserPipe } from "./pipes/createUser.pipe";
import { AdminGuard } from "./guards/auth.guard";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthGatewayInMemory,
        CreateUserPipe,
    ]
})
export class AuthModule {}