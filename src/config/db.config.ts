import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv"
import { join } from "path";
dotenv.config()
dotenv.config({
    path: join(process.cwd(), `.env.${process.env.NodeEnv}`),
});
const {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USERNAME} = process.env;
export default function DBConfig(): TypeOrmModuleOptions {
    
    return {
        type: "postgres",
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: true,
    }
}