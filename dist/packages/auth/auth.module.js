"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("../admin/role/entities/role.entity");
const role_service_1 = require("../admin/role/role.service");
const user_entity_1 = require("../general/entities/user.entity");
const token_service_1 = require("../general/services/token.service");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_guard_1 = require("./guards/jwt.guard");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, role_entity_1.RoleEntity]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
                }
            })
        ],
        controllers: [auth_controller_1.default],
        providers: [auth_service_1.default, token_service_1.default, jwt_guard_1.JwtGuard, jwt_strategy_1.JwtStrategy, role_service_1.RoleService]
    })
], AuthModule);
exports.default = AuthModule;
//# sourceMappingURL=auth.module.js.map