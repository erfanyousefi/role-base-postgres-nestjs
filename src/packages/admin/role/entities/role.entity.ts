import { ROLE } from "src/common/enums/role.enum";
import { TABLES_NAME } from "src/common/enums/tables.enum";
import { UserEntity } from "src/packages/general/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: TABLES_NAME.ROLE})
export class RoleEntity {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id: number;
    @Column({default: ROLE.USER})
    title: ROLE
    @ManyToOne(() => UserEntity, userEntity => userEntity.roles)
    user: UserEntity
}
