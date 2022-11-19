"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let AllExceptionFilter = class AllExceptionFilter {
    catch(exception, host) {
        var _a;
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        let statusCode;
        let errorMessage;
        let invalidParams;
        if (exception instanceof common_1.HttpException) {
            statusCode = exception.getStatus();
            errorMessage = exception.message;
            invalidParams = {};
        }
        else {
            statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = (_a = exception === null || exception === void 0 ? void 0 : exception.message) !== null && _a !== void 0 ? _a : new common_1.InternalServerErrorException().message;
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
AllExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], AllExceptionFilter);
exports.default = AllExceptionFilter;
//# sourceMappingURL=all-exception.filter.js.map