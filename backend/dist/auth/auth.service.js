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
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const bc = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService, userRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async validateUser(username, pass) {
        try {
            const userAuth = await this.userRepository.findOne({
                where: { username },
            });
            bc.compare(pass, userAuth.password, function (err, result) {
            });
            const user = await this.userRepository.findOne({
                where: { username },
            });
            return userAuth;
        }
        catch (error) {
            return null;
        }
    }
    async login(user) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async register(user) {
        const payload = { username: user.username, password: user.password };
        let userVerified = await this.userRepository.findOne({
            username: user.username,
        });
        if (userVerified) {
            throw new common_1.BadRequestException('Nome de Usuario já existe');
        }
        const newUser = await this.userRepository.create(payload).save();
        return this.login(newUser);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(2, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map