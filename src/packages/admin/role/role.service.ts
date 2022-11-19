import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/packages/general/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
  ){}
  async create(createRoleDto: CreateRoleDto) {
    const user = await this.userRepository.findOne({where: {id: +createRoleDto.userID}})
    if(!user) throw new NotFoundException("not found any user")
    const role = await this.roleRepository.findOne({where: {title: createRoleDto.title, user}})
    const insertResult = await this.roleRepository.save({
      id: role? role.id : undefined,
      title: createRoleDto.title,
      user
    })
    return insertResult;
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({where: {id}});
    if(!role) throw new NotFoundException("not found any role");
    return role
  }

  async remove(id: number) {
    const role = await this.findOne(id)
    const deleteResult = await this.roleRepository.delete({id})
    if(deleteResult.affected == 0) throw new BadRequestException("delete role failed")
    return deleteResult
  }
}
