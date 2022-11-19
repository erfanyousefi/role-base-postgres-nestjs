"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
function SwaggerConfig(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Role-Based-Access-Control")
        .setDescription("mini project for test")
        .addBearerAuth(SwaggerBearerConfig())
        .setVersion("v1")
        .addTag("Test")
        .build();
    const SwaggerDocument = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("/", app, SwaggerDocument);
}
exports.default = SwaggerConfig;
function SwaggerBearerConfig() {
    return {
        type: "http",
        scheme: "Bearer",
        bearerFormat: "JWT",
        in: "header"
    };
}
//# sourceMappingURL=swagger.config.js.map