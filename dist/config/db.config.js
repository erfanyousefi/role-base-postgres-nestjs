"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const path_1 = require("path");
dotenv.config();
dotenv.config({
    path: (0, path_1.join)(process.cwd(), `.env.${process.env.NodeEnv}`),
});
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USERNAME } = process.env;
function DBConfig() {
    return {
        type: "postgres",
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: true,
    };
}
exports.default = DBConfig;
//# sourceMappingURL=db.config.js.map