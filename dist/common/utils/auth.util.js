"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromRequestAsBearer = exports.extractTokenAsBearer = exports.comparePassword = exports.hashPassword = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const KEY_LEN = 64;
const ENCODING = "hex";
const hashPassword = (data) => {
    const salt = crypto.randomBytes(16).toString(ENCODING);
    const hash = crypto.scryptSync(data, salt, KEY_LEN).toString(ENCODING);
    return `${salt}:${hash}`;
};
exports.hashPassword = hashPassword;
const comparePassword = (password, hash) => {
    const [salt, key] = hash.split(":");
    const verifyedKey = crypto.scryptSync(password, salt, KEY_LEN).toString(ENCODING);
    return verifyedKey === key;
};
exports.comparePassword = comparePassword;
function extractTokenAsBearer(bearerToken) {
    const [bearer, token] = (bearerToken === null || bearerToken === void 0 ? void 0 : bearerToken.split(' ')) || [undefined, undefined];
    if (!token || !bearer)
        throw new common_1.UnauthorizedException();
    if ((bearer === null || bearer === void 0 ? void 0 : bearer.toLowerCase()) !== 'bearer')
        throw new common_1.UnauthorizedException();
    return token;
}
exports.extractTokenAsBearer = extractTokenAsBearer;
function getTokenFromRequestAsBearer(req) {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    return extractTokenAsBearer(token);
}
exports.getTokenFromRequestAsBearer = getTokenFromRequestAsBearer;
//# sourceMappingURL=auth.util.js.map