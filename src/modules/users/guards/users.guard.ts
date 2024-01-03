import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  canActivate(context: ExecutionContext) {
    context.switchToHttp().getRequest();
    return true;
  }
}
