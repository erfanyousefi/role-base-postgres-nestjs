import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import ValidationException from './validation.exception';
export default class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException | any, host: ArgumentsHost): Response<any, Record<string, any>>;
}
