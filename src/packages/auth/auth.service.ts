import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { ROLE } from "src/common/enums/role.enum";
import { ITokenPayload } from "src/common/interface/jwt.interface";
import { comparePassword, hashPassword } from "src/common/utils/auth.util";
import { Repository } from "typeorm";
import {UserEntity} from "../general/entities/user.entity";
import JwtTokenService from "../general/services/token.service";
import LoginDTO from "./dto/login.dto";
import RegisterDTO from "./dto/register.dto";
import { LoginResult } from "./interface/login.interface";
@Injectable()
export default class AuthService{
    constructor(
        @InjectRepository(UserEntity) private authRepository: Repository<UserEntity>,
        private jwtTokenService: JwtTokenService
    ){}

    async login(payload: LoginDTO): Promise<LoginResult>{
        const {email, password} = payload;
        const user = await this.authRepository.findOne({where: {email}});
        if(user && comparePassword(password, user.password)) {
            user.lastLogedin = new Date();
            const tokenPayload: ITokenPayload = {sub: user.id, email}
            const accessToken: string = this.jwtTokenService.signAccessToken(tokenPayload)
            const refreshToken: string = this.jwtTokenService.signRefreshToken(tokenPayload)
            const roles = user.roles;
            await this.authRepository.save({...user, accessToken, refreshToken})
            return {
                accessToken,
                refreshToken,
                roles
            }
        }
        throw new UnauthorizedException("email or password is incorrect");
    
    }

    async register(payload: RegisterDTO) {
        const row = await this.authRepository.findOne({where: {email: payload.email}});
        if(row) throw new BadRequestException("this email already exist ")
        payload.password = hashPassword(payload.password)
        const user = await this.authRepository.save({
            ...payload,
            role: ROLE.USER
        })
        return user
    }
}