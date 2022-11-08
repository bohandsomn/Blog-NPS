import { Injectable } from '@nestjs/common'

@Injectable()
export class PaginationService {
    readonly DEFAULT_DATA_NUMBER = 5

    slice(page: number, numberOfData = this.DEFAULT_DATA_NUMBER) {
        return <Data>(data: Data[]) => {
            const start = (page - 1) * numberOfData
            const end = start + numberOfData
            return data.slice(start, end)
        }
    }
}
