import { Request } from "express";
export declare const hashPassword: (data: string) => string;
export declare const comparePassword: (password: string, hash: string) => boolean;
export declare function extractTokenAsBearer(bearerToken: string): string;
export declare function getTokenFromRequestAsBearer(req: Request): string;
