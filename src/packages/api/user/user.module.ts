import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import JwtTokenService from 'src/packages/general/services/token.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/packages/general/entities/user.entity';
import { RoleGuard } from 'src/packages/auth/guards/role.guard';
import { RoleEntity } from 'src/packages/admin/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  controllers: [UserController],
  providers: [UserService, JwtTokenService, JwtService, RoleGuard]
})
export class UserModule {}
