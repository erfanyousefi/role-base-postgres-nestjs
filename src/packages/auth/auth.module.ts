import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "../admin/role/entities/role.entity";
import { RoleService } from "../admin/role/role.service";
import {UserEntity} from "../general/entities/user.entity";
import JwtTokenService from "../general/services/token.service";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import { JwtGuard } from "./guards/jwt.guard";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  ],
  controllers: [AuthController],
  providers: [ AuthService, JwtTokenService, JwtGuard, JwtStrategy, RoleService]
})
export default class AuthModule {}