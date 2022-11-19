import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ROLE } from 'src/common/enums/role.enum';
import { RoleIdDTO } from './dto/find-role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createRoleDto: CreateRoleDto): Promise<{
        id: number;
        title: ROLE;
        user: import("../../general/entities/user.entity").UserEntity;
    } & import("./entities/role.entity").RoleEntity>;
    findAll(): Promise<import("./entities/role.entity").RoleEntity[]>;
    findOne(param: RoleIdDTO): Promise<import("./entities/role.entity").RoleEntity>;
    remove(param: RoleIdDTO): Promise<import("typeorm").DeleteResult>;
}
