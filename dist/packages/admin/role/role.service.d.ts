import { UserEntity } from 'src/packages/general/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEntity } from './entities/role.entity';
export declare class RoleService {
    private userRepository;
    private roleRepository;
    constructor(userRepository: Repository<UserEntity>, roleRepository: Repository<RoleEntity>);
    create(createRoleDto: CreateRoleDto): Promise<{
        id: number;
        title: import("../../../common/enums/role.enum").ROLE;
        user: UserEntity;
    } & RoleEntity>;
    findAll(): Promise<RoleEntity[]>;
    findOne(id: number): Promise<RoleEntity>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
