import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserEntity } from "src/packages/general/entities/user.entity";
import JwtTokenService from "src/packages/general/services/token.service";
import { Repository } from "typeorm";
export default class CheckTokenInterceptor implements NestInterceptor {
    private readonly userRepository;
    private jwtTokenService;
    constructor(userRepository: Repository<UserEntity>, jwtTokenService: JwtTokenService);
    intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>>;
}
