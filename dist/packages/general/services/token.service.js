"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const class_validator_1 = require("class-validator");
let JwtTokenService = class JwtTokenService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    signAccessToken(payload) {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        });
        ;
    }
    signRefreshToken(payload) {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        });
        ;
    }
    verifyAccessToken(token) {
        const verifyResult = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET_KEY
        });
        if ((0, class_validator_1.isObject)(verifyResult) && (verifyResult === null || verifyResult === void 0 ? void 0 : verifyResult.email))
            return verifyResult;
        throw new common_1.BadRequestException(verifyResult !== null && verifyResult !== void 0 ? verifyResult : "Some thing wrong");
    }
};
JwtTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtTokenService);
exports.default = JwtTokenService;
//# sourceMappingURL=token.service.js.map