import { ROLE } from "src/common/enums/role.enum";
import { TABLES_NAME } from "src/common/enums/tables.enum";
import { RoleEntity } from "src/packages/admin/role/entities/role.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: TABLES_NAME.USER})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column({unique: true})
    email: string;
    @Column()
    password: string;
    @Column({default: new Date()})
    lastLogedin: Date;
    @Column({nullable: true})
    accessToken?: string;
    @Column({nullable: true})
    refreshToken?: string;
    @OneToMany(() => RoleEntity, roleEntity => roleEntity.user)
    roles: RoleEntity;
}