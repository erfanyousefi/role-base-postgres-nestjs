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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../packages/general/entities/user.entity");
const token_service_1 = require("../../packages/general/services/token.service");
const typeorm_2 = require("typeorm");
const auth_util_1 = require("../utils/auth.util");
let CheckTokenInterceptor = class CheckTokenInterceptor {
    constructor(userRepository, jwtTokenService) {
        this.userRepository = userRepository;
        this.jwtTokenService = jwtTokenService;
    }
    async intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const token = (0, auth_util_1.getTokenFromRequestAsBearer)(req);
        const { email } = this.jwtTokenService.verifyAccessToken(token);
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user)
            throw new common_1.UnauthorizedException();
        if (user.accessToken !== token) {
            throw new common_1.UnauthorizedException("Login to your account again");
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
        };
        return next.handle().pipe();
    }
};
CheckTokenInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        token_service_1.default])
], CheckTokenInterceptor);
exports.default = CheckTokenInterceptor;
//# sourceMappingURL=checkToken.interceptor.js.map