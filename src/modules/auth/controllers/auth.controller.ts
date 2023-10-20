import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { get } from "http";
import { ICreateUserDto } from "../dto/createUserDto";
import { Response } from "express";
import { CreateUserPipe } from "../pipes/createUser.pipe";
import { AdminGuard } from "../guards/auth.guard";

@Controller('auth')
export class AuthController{
    constructor(
        private authService: AuthService
    ){}

    @Get("users")
    async getAllUsers(){
        return await this.authService.findAll()
    }

    @Get("users/:id")
    @UseGuards(AdminGuard)
    async getUserById(@Param('id') id: string){
        return await this.authService.findById(id)
    }

    @Post("register")
    async register(@Body(new CreateUserPipe()) body: ICreateUserDto, @Res() res: Response) {
        await this.authService.create(body)
        return res.status(HttpStatus.CREATED).json([])
    }
    
}