import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import DBConfig from './config/db.config';
import { RoleModule } from './packages/admin/role/role.module';
import { UserModule } from './packages/api/user/user.module';
import AuthModule from './packages/auth/auth.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:path.join(process.cwd(), `.env.${process.env.NodeEnv}`)
    }),
    TypeOrmModule.forRoot(DBConfig()),
    AuthModule,
    UserModule,
    RoleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
