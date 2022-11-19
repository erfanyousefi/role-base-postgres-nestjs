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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const swagger_1 = require("@nestjs/swagger");
const swagger_enum_1 = require("../../../common/enums/swagger.enum");
const role_decorator_1 = require("../../../common/decorators/role.decorator");
const role_enum_1 = require("../../../common/enums/role.enum");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const role_guard_1 = require("../../auth/guards/role.guard");
const find_role_dto_1 = require("./dto/find-role.dto");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    create(createRoleDto) {
        return this.roleService.create(createRoleDto);
    }
    findAll() {
        return this.roleService.findAll();
    }
    findOne(param) {
        return this.roleService.findOne(+param.roleID);
    }
    remove(param) {
        return this.roleService.remove(+param.roleID);
    }
};
__decorate([
    (0, common_1.Post)("/create"),
    (0, swagger_1.ApiConsumes)(swagger_enum_1.ContentType.URL_ENCODED, swagger_enum_1.ContentType.JSON),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "create", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.ROLE.USER),
    (0, common_1.Get)("/list"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:roleID'),
    (0, swagger_1.ApiParam)({ name: "roleID", type: "integer" }),
    __param(0, (0, common_1.Param)('roleID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_role_dto_1.RoleIdDTO]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)('/remove/:roleID'),
    (0, swagger_1.ApiParam)({ name: "roleID", type: "integer" }),
    __param(0, (0, common_1.Param)('roleID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_role_dto_1.RoleIdDTO]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "remove", null);
RoleController = __decorate([
    (0, common_1.Controller)('role'),
    (0, role_decorator_1.Roles)(role_enum_1.ROLE.ADMIN),
    (0, swagger_1.ApiTags)(swagger_enum_1.SwaggerTags.ADMIN_ROLE),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RoleGuard),
    (0, swagger_1.ApiBearerAuth)(swagger_enum_1.SwaggerAuth.BEARER),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map