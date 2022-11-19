import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/common/decorators/role.decorator";
import { ROLE } from "src/common/enums/role.enum";
import { RoleEntity } from "src/packages/admin/role/entities/role.entity";
import { UserEntity } from "src/packages/general/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    ){}
    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        const req: Request | any = context.switchToHttp().getRequest<Request>();
        const roles = await this.roleRepository.find({where: {user : {id : req.user.id}}})
        const user = await this.userRepository.findOne({where: {email: req?.user?.email}, relations: {
            roles: true
        }});
        const userRole = user.roles.map(r => r.title);
        
        if(!requiredRoles || requiredRoles.length == 0) return true;
        return requiredRoles.some(role => userRole.includes(role));
    }
}