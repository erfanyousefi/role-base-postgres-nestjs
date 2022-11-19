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
  import ValidationException from './validation.exception';
  
  @Catch(ValidationException)
  export default class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException | any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const res: Response = ctx.getResponse<Response>();
      let statusCode: HttpStatus;
      let errorMessage: ErrorType;
      let invalidParams: ErrorType;
      if (exception instanceof ValidationException) {
        statusCode = exception.getStatus();
        errorMessage = exception.message;
        const errors = {}
        exception?.validationErrors?.forEach(err => {
          const keys = Object.keys(err)
          errors[keys[0]] = err[keys[0]][0]
        })
        invalidParams = errors
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
  