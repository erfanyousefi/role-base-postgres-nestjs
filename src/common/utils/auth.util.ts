import { UnauthorizedException } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import * as crypto from "crypto"
import { Request } from "express";

const KEY_LEN: number = 64;
const ENCODING: BufferEncoding = "hex";

export const hashPassword = (data: string): string => {
    const salt = crypto.randomBytes(16).toString(ENCODING);
    const hash = crypto.scryptSync(data, salt, KEY_LEN).toString(ENCODING)
    return `${salt}:${hash}`
}
export const comparePassword = (password: string, hash: string) : boolean => {
    const [salt, key] = hash.split(":");
    const verifyedKey = crypto.scryptSync(password, salt, KEY_LEN).toString(ENCODING);
    return verifyedKey === key;
}

export function extractTokenAsBearer(bearerToken: string) {
    const [bearer, token] = bearerToken?.split(' ') || [undefined, undefined];
    if (!token || !bearer) throw new UnauthorizedException();
    if (bearer?.toLowerCase() !== 'bearer') throw new UnauthorizedException();
    return token;
}
export function getTokenFromRequestAsBearer(req: Request) {
    const token: string | undefined = req?.headers?.authorization;
    return extractTokenAsBearer(token);
}