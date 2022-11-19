import { config } from "dotenv"
import { NodeEnvironment } from "src/common/enums/glob.enum";

config();
const {APP_HOST, APP_METHOD, APP_PORT, NodeEnv} = process.env;

export const BackendURL: string = NodeEnv == NodeEnvironment.DEVELOPMENT ?   `${APP_METHOD}://${APP_HOST}:${APP_PORT}`:
`${APP_METHOD}://${APP_HOST}`;