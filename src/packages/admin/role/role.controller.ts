import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerAuth, SwaggerTags } from 'src/common/enums/swagger.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/enums/role.enum';
import { JwtGuard } from 'src/packages/auth/guards/jwt.guard';
import { RoleGuard } from 'src/packages/auth/guards/role.guard';
import { RoleIdDTO } from './dto/find-role.dto';

@Controller('role')
@Roles(ROLE.ADMIN)
@ApiTags(SwaggerTags.ADMIN_ROLE)
@UseGuards(JwtGuard, RoleGuard)
@ApiBearerAuth(SwaggerAuth.BEARER)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post("/create")
  @ApiConsumes(ContentType.URL_ENCODED, ContentType.JSON)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Roles(ROLE.USER)
  @Get("/list")
  findAll() {
    return this.roleService.findAll();
  }

  @Get('/:roleID')
  @ApiParam({name: "roleID", type: "integer"})
  findOne(@Param('roleID') param: RoleIdDTO) {
    return this.roleService.findOne(+param.roleID);
  }
  
  @Delete('/remove/:roleID')
  @ApiParam({name: "roleID", type: "integer"})
  remove(@Param('roleID') param: RoleIdDTO) {
    return this.roleService.remove(+param.roleID);
  }
}
