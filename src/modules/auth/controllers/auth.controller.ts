import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { loginDto } from '../dto/login-dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() body: loginDto, @Res() res: Response) {
    try{
      const targetUser = await this.authService.login(body)
      return res.status(HttpStatus.ACCEPTED).json(targetUser)
    } catch(error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST, {
        cause: error.message
      })
    }
  }

  @Get("logout")
  async logout(@Res() res: Response) {
    try{
      const logoutUser = await this.authService.logout()
      return res.status(HttpStatus.ACCEPTED).json({message: "Usuario deslogado com sucesso"})
    } catch(error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.message
      })
    }
  }

}
