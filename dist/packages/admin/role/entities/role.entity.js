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
exports.RoleEntity = void 0;
const role_enum_1 = require("../../../../common/enums/role.enum");
const tables_enum_1 = require("../../../../common/enums/tables.enum");
const user_entity_1 = require("../../../general/entities/user.entity");
const typeorm_1 = require("typeorm");
let RoleEntity = class RoleEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: role_enum_1.ROLE.USER }),
    __metadata("design:type", String)
], RoleEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, userEntity => userEntity.roles),
    __metadata("design:type", user_entity_1.UserEntity)
], RoleEntity.prototype, "user", void 0);
RoleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: tables_enum_1.TABLES_NAME.ROLE })
], RoleEntity);
exports.RoleEntity = RoleEntity;
//# sourceMappingURL=role.entity.js.map