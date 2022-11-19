import { RoleEntity } from "src/packages/admin/role/entities/role.entity";
export interface LoginResult {
    accessToken: string;
    refreshToken: string;
    roles: RoleEntity;
}
