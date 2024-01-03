import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { loginDto } from '../dto/login-dto';
import { Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: loginDto, @Res() res: Response) {
    try {
      const targetUser = await this.authService.login(body);
      return res.status(HttpStatus.ACCEPTED).json(targetUser);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error.message,
        },
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@Res() res: Response) {
    try {
      await this.authService.logout();
      return res
        .status(HttpStatus.ACCEPTED)
        .json({ message: 'Usuario deslogado com sucesso' });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error.message,
        },
      );
    }
  }

  @UseGuards(AuthGuard)
  @Post('delete')
  async deleteUser(@Body() body: loginDto, @Res() res: Response) {
    try {
      await this.authService.deleteUser(body);
      return res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: 'Usuario excluido com sucesso' });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error.message,
        },
      );
    }
  }
}
