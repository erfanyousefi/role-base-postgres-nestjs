import { ROLE } from "src/common/enums/role.enum";
import { UserEntity } from "src/packages/general/entities/user.entity";
export declare class RoleEntity {
    [x: string]: any;
    id: number;
    title: ROLE;
    user: UserEntity;
}
