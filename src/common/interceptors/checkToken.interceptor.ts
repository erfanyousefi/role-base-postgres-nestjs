import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Observable } from "rxjs";
import { UserEntity } from "src/packages/general/entities/user.entity";
import JwtTokenService from "src/packages/general/services/token.service";
import { Repository } from "typeorm";
import { getTokenFromRequestAsBearer } from "../utils/auth.util";

@Injectable()
export default class CheckTokenInterceptor implements NestInterceptor {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private jwtTokenService: JwtTokenService
    ) {}
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const req: Request = context.switchToHttp().getRequest<Request>();
        const token = getTokenFromRequestAsBearer(req);
        const {email} = this.jwtTokenService.verifyAccessToken(token);
        const user = await this.userRepository.findOne({where: {email}})
        if (!user) throw new UnauthorizedException();
        if(user.accessToken !== token) {
            throw new UnauthorizedException("Login to your account again");
        }
        req.user = {
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            lastLogedin: user.lastLogedin,
            email: user.email,
            roles: user.roles,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken
        }
        return next.handle().pipe()
    }
}