import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class CreateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.firstName || !value.lastName) {
      throw new BadRequestException('firstName and lastName are required');
    }

    return value;
  }
}
