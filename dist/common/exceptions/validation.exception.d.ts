import { BadRequestException } from '@nestjs/common';
export default class ValidationException extends BadRequestException {
    validationErrors: object[] | string[];
    constructor(validationErrors: object[] | string[]);
}
