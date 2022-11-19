import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { isObject } from "class-validator";
import { ITokenPayload } from "src/common/interface/jwt.interface";

@Injectable()
export default class JwtTokenService {
    constructor(private jwtService: JwtService) { }

    signAccessToken(payload: ITokenPayload) {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        });;
    }
    signRefreshToken(payload: ITokenPayload) {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        });;
    }
    verifyAccessToken(token: string) {
        const verifyResult: ITokenPayload & string = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET_KEY
        })
        if (isObject(verifyResult) && verifyResult?.email) return verifyResult;
        throw new BadRequestException(verifyResult ?? "Some thing wrong");
    }
}