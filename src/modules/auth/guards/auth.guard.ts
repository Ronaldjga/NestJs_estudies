import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService : JwtService
    ){}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const tokenProcess = this.extractTokenFromHeader(request)
        // console.log("log guard, requisicao: ", request)

        if (!tokenProcess) {
            console.log('log guard, não foi autorizado')
            throw new UnauthorizedException();
          }
          try {
            console.log('log guard, foi autorizado, pasou, ta tudo certo')
            const payload = await this.jwtService.verifyAsync(
              tokenProcess,
              {
                secret: process.env.JWT_SECRET
              }
            );
            request['user'] = payload;
          } catch {
            console.log('log guard, deu erro')
            throw new UnauthorizedException();
          }
          return true;
    }
 
    
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        console.log('log guard, extração do token: ', token)
        console.log('log guard, header: ', request.headers)
        return type === 'Bearer' ? token : undefined;
    }
}