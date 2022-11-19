"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const validation_exception_1 = require("./validation.exception");
let ValidationFilter = class ValidationFilter {
    catch(exception, host) {
        var _a, _b;
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        let statusCode;
        let errorMessage;
        let invalidParams;
        if (exception instanceof validation_exception_1.default) {
            statusCode = exception.getStatus();
            errorMessage = exception.message;
            const errors = {};
            (_a = exception === null || exception === void 0 ? void 0 : exception.validationErrors) === null || _a === void 0 ? void 0 : _a.forEach(err => {
                const keys = Object.keys(err);
                errors[keys[0]] = err[keys[0]][0];
            });
            invalidParams = errors;
        }
        else {
            statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = (_b = exception === null || exception === void 0 ? void 0 : exception.message) !== null && _b !== void 0 ? _b : new common_1.InternalServerErrorException().message;
            invalidParams = {};
        }
        const errorResponse = {
            statusCode,
            errors: {
                title: errorMessage,
                invalidParams,
            },
        };
        return res.status(errorResponse.statusCode).json(errorResponse);
    }
};
ValidationFilter = __decorate([
    (0, common_1.Catch)(validation_exception_1.default)
], ValidationFilter);
exports.default = ValidationFilter;
//# sourceMappingURL=validation.filter.js.map