import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { ICreateUserDto } from "../dto/create-user-dto";
import { Response } from "express";
import { CreateUserPipe } from "../pipes/createUser.pipe";
import { UsersGuard } from "../guards/users.guard";
import { loginDto } from "src/modules/auth/dto/login-dto";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";

@Controller('users')
export class UsersController{
    constructor(
        private readonly usersService: UsersService
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

    @Post("delete")
    @UseGuards(AuthGuard)
    async deleteUser(@Body() body: loginDto, @Res() res: Response){
        try{
            const targetUserForDelete = await this.usersService.deleteUser(body)
            return res.status(HttpStatus.NO_CONTENT).json({message: "Usuario excluido com sucesso"})
        } catch(error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message
            }, HttpStatus.BAD_REQUEST, {
                cause: error.message
            })
        }
    }
    
}