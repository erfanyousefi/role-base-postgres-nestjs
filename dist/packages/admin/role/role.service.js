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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../general/entities/user.entity");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./entities/role.entity");
let RoleService = class RoleService {
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async create(createRoleDto) {
        const user = await this.userRepository.findOne({ where: { id: +createRoleDto.userID } });
        if (!user)
            throw new common_1.NotFoundException("not found any user");
        const role = await this.roleRepository.findOne({ where: { title: createRoleDto.title, user } });
        const insertResult = await this.roleRepository.save({
            id: role ? role.id : undefined,
            title: createRoleDto.title,
            user
        });
        return insertResult;
    }
    async findAll() {
        return await this.roleRepository.find();
    }
    async findOne(id) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role)
            throw new common_1.NotFoundException("not found any role");
        return role;
    }
    async remove(id) {
        const role = await this.findOne(id);
        const deleteResult = await this.roleRepository.delete({ id });
        if (deleteResult.affected == 0)
            throw new common_1.BadRequestException("delete role failed");
        return deleteResult;
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map