import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService){}

    canActivate(context: ExecutionContext) {
        const args = context.switchToHttp().getRequest()
        console.log(args, 'logando no guard')
        return true
    }
    
}