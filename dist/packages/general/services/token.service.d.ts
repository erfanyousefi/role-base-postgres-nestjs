import { JwtService } from "@nestjs/jwt";
import { ITokenPayload } from "src/common/interface/jwt.interface";
export default class JwtTokenService {
    private jwtService;
    constructor(jwtService: JwtService);
    signAccessToken(payload: ITokenPayload): string;
    signRefreshToken(payload: ITokenPayload): string;
    verifyAccessToken(token: string): ITokenPayload & string;
}
