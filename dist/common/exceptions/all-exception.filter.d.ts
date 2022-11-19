import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
export default class AllExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | any, host: ArgumentsHost): Response<any, Record<string, any>>;
}
