import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

import { ErrorResponse, ErrorType } from 'src/common/typeDef/public';

@Catch(HttpException)
export default class AllExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res: Response = ctx.getResponse<Response>();
        let statusCode: HttpStatus;
        let errorMessage: ErrorType;
        let invalidParams: ErrorType;
        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            errorMessage = exception.message;
            invalidParams = {};
        } else {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = exception?.message ?? new InternalServerErrorException().message;
            invalidParams = {};
        }
        const errorResponse: ErrorResponse = {
            statusCode,
            errors: {
                title: errorMessage,
                invalidParams,
            },
        };
        return res.status(errorResponse.statusCode).json(errorResponse);
    }
}
