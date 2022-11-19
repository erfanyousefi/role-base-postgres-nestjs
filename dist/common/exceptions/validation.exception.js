"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class ValidationException extends common_1.BadRequestException {
    constructor(validationErrors) {
        super();
        this.validationErrors = validationErrors;
    }
}
exports.default = ValidationException;
//# sourceMappingURL=validation.exception.js.map