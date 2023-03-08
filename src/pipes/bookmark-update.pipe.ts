import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common'

@Injectable()
export class CheckNullBodyPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (Object.keys(value).length === 0) {
            throw new BadRequestException('Request body can not be empty')
        }
        return value
    }
}
