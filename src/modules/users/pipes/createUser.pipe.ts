import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, 'LOGANDO NO PIPE');
    if (value.id) {
      throw new BadRequestException("O campo 'id' não deve ser enviado");
    }
    return {
      username: String(value.username),
      email: String(value.email),
      password: String(value.password),
    };
  }
}
