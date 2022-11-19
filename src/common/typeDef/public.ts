import { HttpStatus } from "@nestjs/common";

export type FieldErrorMessage = { [key: string]: string };
export type RestFulResponse = {
    statusCode: HttpStatus;
    message?: string;
};
export type CustomValidationError = {
    title: string;
    invalidParams: FieldErrorMessage;
};
export type ErrorType = string | any;
export type ErrorResponse = RestFulResponse & {
    errors: CustomValidationError;
};