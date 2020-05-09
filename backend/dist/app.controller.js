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
const app_service_1 = require("./app.service");
const auth_service_1 = require("./auth/auth.service");
const path_1 = require("path");
let AppController = class AppController {
    constructor(authService, appService) {
        this.authService = authService;
        this.appService = appService;
    }
    get(res) {
        res.sendFile('index.html', {
            root: path_1.join(__dirname, '..', '..', 'frontend', 'www'),
        });
    }
    trands() {
        return this.appService.getWeb('https://www.youtube.com/feed/trending');
    }
    index() {
        return this.appService.getWeb('https://www.youtube.com');
    }
    search(query) {
        console.log(query);
        return this.appService.getWeb('https://www.youtube.com/results?search_query=' + query);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "get", null);
__decorate([
    common_1.Get('trending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "trands", null);
__decorate([
    common_1.Get('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "index", null);
__decorate([
    common_1.Get('search/:query'),
    __param(0, common_1.Param('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "search", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map