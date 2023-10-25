import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { ICreateUserDto } from "../dto/create-user-dto";

@Injectable()
export class CreateUserPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value, 'LOGANDO NO PIPE')
        if(value.id) {
            throw new BadRequestException("O campo 'id' não deve ser enviado")
        }
        return {
            name: String(value.name),
            lastname: String(value.lastname),
            email: String(value.email)
        }
    }
}
