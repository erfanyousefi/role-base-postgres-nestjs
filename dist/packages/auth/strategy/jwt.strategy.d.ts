import { Strategy } from "passport-jwt";
import { ITokenPayload } from "src/common/interface/jwt.interface";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: ITokenPayload): Promise<{
        sub: number;
        email: string;
    }>;
}
export {};
