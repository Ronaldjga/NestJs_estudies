import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { ICreateUserDto } from "../dto/create-user-dto";
import { Response } from "express";
import { CreateUserPipe } from "../pipes/createUser.pipe";
import { UsersGuard } from "../guards/users.guard";

@Controller('users')
export class AuthController{
    constructor(
        private usersService: UsersService
    ){}

    @Get("all")
    async getAllUsers(){
        return await this.usersService.findAll()
    }

    @Get(":idOrUsername")
    @UseGuards(UsersGuard)
    async getUserById(@Param('idOrUsername') idOrUsername: string){
        return await this.usersService.findUserByIdOrUsername(idOrUsername)
    }

    @Post("register")
    async register(@Body(new CreateUserPipe()) body: ICreateUserDto, @Res() res: Response) {
        await this.usersService.create(body)
        return res.status(HttpStatus.CREATED).json([])
    }
    
}