"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const all_exception_filter_1 = require("./common/exceptions/all-exception.filter");
const validation_exception_1 = require("./common/exceptions/validation.exception");
const validation_filter_1 = require("./common/exceptions/validation.filter");
const functions_1 = require("./common/utils/functions");
const glob_config_1 = require("./config/glob.config");
const swagger_config_1 = require("./config/swagger.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new all_exception_filter_1.default(), new validation_filter_1.default());
    app.useGlobalPipes(new common_1.ValidationPipe({
        skipMissingProperties: true,
        exceptionFactory: (errors) => {
            const messages = errors.map(err => ({
                [err.property]: Object.values(err.constraints),
            }));
            return new validation_exception_1.default(messages);
        }
    }));
    (0, swagger_config_1.default)(app);
    await app.listen(process.env.APP_PORT, () => {
        functions_1.logger.debug(glob_config_1.BackendURL);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map