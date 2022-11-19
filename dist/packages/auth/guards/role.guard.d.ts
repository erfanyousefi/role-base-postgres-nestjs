import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleEntity } from "src/packages/admin/role/entities/role.entity";
import { UserEntity } from "src/packages/general/entities/user.entity";
import { Repository } from "typeorm";
export declare class RoleGuard implements CanActivate {
    private reflector;
    private userRepository;
    private roleRepository;
    constructor(reflector: Reflector, userRepository: Repository<UserEntity>, roleRepository: Repository<RoleEntity>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
