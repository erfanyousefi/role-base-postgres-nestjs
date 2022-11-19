import { RoleEntity } from "src/packages/admin/role/entities/role.entity";
export declare class UserEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    lastLogedin: Date;
    accessToken?: string;
    refreshToken?: string;
    roles: RoleEntity;
}
