import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../services/users.service";

@Injectable()
export class UsersGuard implements CanActivate {
    constructor(private usersService: UsersService){}

    canActivate(context: ExecutionContext) {
        const args = context.switchToHttp().getRequest()
        // console.log(args, 'logando no guard')
        return true
    }
    
}