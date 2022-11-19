import { Controller, Get, HttpStatus, Patch, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/enums/role.enum';
import { SwaggerAuth, SwaggerTags } from 'src/common/enums/swagger.enum';
import CheckTokenInterceptor from 'src/common/interceptors/checkToken.interceptor';
import { JwtGuard } from 'src/packages/auth/guards/jwt.guard';
import { RoleGuard } from 'src/packages/auth/guards/role.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtGuard)
@UseInterceptors(CheckTokenInterceptor)
@ApiBearerAuth(SwaggerAuth.BEARER)
@ApiTags(SwaggerTags.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get("/whoami")
  index(@Req() req: Request) {
    return {
      statusCode: HttpStatus.OK,
      data : req.user
    }
  }

  @Patch("/edit")
  @Roles(ROLE.USER)
  @UseGuards(JwtGuard, RoleGuard)
  edit(){
    return "You are admin"
  }
}
