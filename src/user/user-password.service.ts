import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserPasswordService {
    async hash(password: string) {
        const hash = await bcrypt.hash(password, 5)
        return hash
    }

    async compare(passwordToCompare: string, hash: string) {
        const passwordEquals = await bcrypt.compare(passwordToCompare, hash)
        return passwordEquals
    }
}
