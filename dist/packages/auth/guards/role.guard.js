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
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const role_decorator_1 = require("../../../common/decorators/role.decorator");
const role_entity_1 = require("../../admin/role/entities/role.entity");
const user_entity_1 = require("../../general/entities/user.entity");
const typeorm_2 = require("typeorm");
let RoleGuard = class RoleGuard {
    constructor(reflector, userRepository, roleRepository) {
        this.reflector = reflector;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async canActivate(context) {
        var _a;
        const requiredRoles = this.reflector.getAllAndOverride(role_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        const req = context.switchToHttp().getRequest();
        const roles = await this.roleRepository.find({ where: { user: { id: req.user.id } } });
        const user = await this.userRepository.findOne({ where: { email: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email }, relations: {
                roles: true
            } });
        const userRole = user.roles.map(r => r.title);
        if (!requiredRoles || requiredRoles.length == 0)
            return true;
        return requiredRoles.some(role => userRole.includes(role));
    }
};
RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RoleGuard);
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.guard.js.map