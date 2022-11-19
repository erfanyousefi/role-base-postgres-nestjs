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
const role_enum_1 = require("../../common/enums/role.enum");
const auth_util_1 = require("../../common/utils/auth.util");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../general/entities/user.entity");
const token_service_1 = require("../general/services/token.service");
let AuthService = class AuthService {
    constructor(authRepository, jwtTokenService) {
        this.authRepository = authRepository;
        this.jwtTokenService = jwtTokenService;
    }
    async login(payload) {
        const { email, password } = payload;
        const user = await this.authRepository.findOne({ where: { email } });
        if (user && (0, auth_util_1.comparePassword)(password, user.password)) {
            user.lastLogedin = new Date();
            const tokenPayload = { sub: user.id, email };
            const accessToken = this.jwtTokenService.signAccessToken(tokenPayload);
            const refreshToken = this.jwtTokenService.signRefreshToken(tokenPayload);
            const roles = user.roles;
            await this.authRepository.save(Object.assign(Object.assign({}, user), { accessToken, refreshToken }));
            return {
                accessToken,
                refreshToken,
                roles
            };
        }
        throw new common_1.UnauthorizedException("email or password is incorrect");
    }
    async register(payload) {
        const row = await this.authRepository.findOne({ where: { email: payload.email } });
        if (row)
            throw new common_1.BadRequestException("this email already exist ");
        payload.password = (0, auth_util_1.hashPassword)(payload.password);
        const user = await this.authRepository.save(Object.assign(Object.assign({}, payload), { role: role_enum_1.ROLE.USER }));
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        token_service_1.default])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map