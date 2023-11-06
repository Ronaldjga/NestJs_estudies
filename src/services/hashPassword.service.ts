import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashPassword {
    async hashedPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>{
        return await bcrypt.compare(plainPassword, hashedPassword)
    }
}