"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerAuth = exports.SwaggerTags = exports.ContentType = void 0;
var ContentType;
(function (ContentType) {
    ContentType["URL_ENCODED"] = "application/x-www-form-urlencoded";
    ContentType["JSON"] = "application/json";
    ContentType["MULTIPART"] = "multipart/form-data";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
var SwaggerTags;
(function (SwaggerTags) {
    SwaggerTags["USER"] = "user";
    SwaggerTags["AUTHORIZATION"] = "Authorization";
    SwaggerTags["ADMIN_ROLE"] = "Admin-Role";
})(SwaggerTags = exports.SwaggerTags || (exports.SwaggerTags = {}));
var SwaggerAuth;
(function (SwaggerAuth) {
    SwaggerAuth["BEARER"] = "bearer";
})(SwaggerAuth = exports.SwaggerAuth || (exports.SwaggerAuth = {}));
//# sourceMappingURL=swagger.enum.js.map