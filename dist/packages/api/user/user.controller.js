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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../../../common/decorators/role.decorator");
const role_enum_1 = require("../../../common/enums/role.enum");
const swagger_enum_1 = require("../../../common/enums/swagger.enum");
const checkToken_interceptor_1 = require("../../../common/interceptors/checkToken.interceptor");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const role_guard_1 = require("../../auth/guards/role.guard");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    index(req) {
        return {
            statusCode: common_1.HttpStatus.OK,
            data: req.user
        };
    }
    edit() {
        return "You are admin";
    }
};
__decorate([
    (0, common_1.Get)("/whoami"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "index", null);
__decorate([
    (0, common_1.Patch)("/edit"),
    (0, role_decorator_1.Roles)(role_enum_1.ROLE.USER),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RoleGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "edit", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.UseInterceptors)(checkToken_interceptor_1.default),
    (0, swagger_1.ApiBearerAuth)(swagger_enum_1.SwaggerAuth.BEARER),
    (0, swagger_1.ApiTags)(swagger_enum_1.SwaggerTags.USER),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map