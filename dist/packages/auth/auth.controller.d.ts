import { HttpStatus } from "@nestjs/common";
import AuthService from "./auth.service";
import LoginDTO from "./dto/login.dto";
import RegisterDTO from "./dto/register.dto";
export default class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginDTO): Promise<{
        statusCode: HttpStatus;
        data: import("./interface/login.interface").LoginResult;
    }>;
    register(body: RegisterDTO): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            role: import("../../common/enums/role.enum").ROLE;
            firstName: string;
            lastName: string;
            email: string;
            password: string;
        } & import("../general/entities/user.entity").UserEntity;
    }>;
}
