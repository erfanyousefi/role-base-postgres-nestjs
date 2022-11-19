import { ROLE } from "src/common/enums/role.enum";
import { Repository } from "typeorm";
import { UserEntity } from "../general/entities/user.entity";
import JwtTokenService from "../general/services/token.service";
import LoginDTO from "./dto/login.dto";
import RegisterDTO from "./dto/register.dto";
import { LoginResult } from "./interface/login.interface";
export default class AuthService {
    private authRepository;
    private jwtTokenService;
    constructor(authRepository: Repository<UserEntity>, jwtTokenService: JwtTokenService);
    login(payload: LoginDTO): Promise<LoginResult>;
    register(payload: RegisterDTO): Promise<{
        role: ROLE;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    } & UserEntity>;
}
