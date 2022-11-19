import { HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    index(req: Request): {
        statusCode: HttpStatus;
        data: Express.User;
    };
    edit(): string;
}
