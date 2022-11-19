"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
class RoleGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        return true;
    }
}
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.guard.js.map