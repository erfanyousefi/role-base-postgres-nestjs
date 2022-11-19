"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendURL = void 0;
const dotenv_1 = require("dotenv");
const glob_enum_1 = require("../common/enums/glob.enum");
(0, dotenv_1.config)();
const { APP_HOST, APP_METHOD, APP_PORT, NodeEnv } = process.env;
exports.BackendURL = NodeEnv == glob_enum_1.NodeEnvironment.DEVELOPMENT ? `${APP_METHOD}://${APP_HOST}:${APP_PORT}` :
    `${APP_METHOD}://${APP_HOST}`;
//# sourceMappingURL=glob.config.js.map