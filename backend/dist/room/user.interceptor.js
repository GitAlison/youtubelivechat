"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
let UserInterceptor = class UserInterceptor {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async intercept(context, next) {
        console.log(context.getHandler());
        let contentSocket = context.switchToWs().getData();
        let jwt = contentSocket.headers;
        console.log(jwt);
        contentSocket.user = await this.getUser('we');
        return next.handle().pipe(operators_1.map(data => data));
    }
    async getUser(Jwt) {
        if (this.jwtService.verify(Jwt)) {
            console.log(this.jwtService.decode(Jwt));
        }
        let user = await this.userRepository.findOne({ id: 1 });
        return user;
    }
};
UserInterceptor = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], UserInterceptor);
exports.UserInterceptor = UserInterceptor;
//# sourceMappingURL=user.interceptor.js.map