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
const websockets_1 = require("@nestjs/websockets");
const room_service_1 = require("./room.service");
const common_1 = require("@nestjs/common");
const user_interceptor_1 = require("../auth/user.interceptor");
let RoomGateWay = class RoomGateWay {
    constructor(roomService) {
        this.roomService = roomService;
        this.users = 0;
    }
    async handleConnection(client) {
        this.users++;
        this.server.emit('users', this.users);
    }
    async handleDisconnect() {
        this.users--;
        this.server.emit('users', this.users);
    }
    async onRoom(client, data) {
        switch (data['type']) {
            case 'send_message':
                let messageCreated = await this.roomService.createMessage(data);
                client.broadcast.emit(`room${messageCreated.room}`, messageCreated);
                break;
            case 'open':
                await this.roomService.createRoom(data['message']);
                break;
            default:
                break;
        }
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], RoomGateWay.prototype, "server", void 0);
__decorate([
    common_1.UseInterceptors(user_interceptor_1.UserInterceptor),
    websockets_1.SubscribeMessage('room'),
    __param(0, websockets_1.ConnectedSocket()), __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomGateWay.prototype, "onRoom", null);
RoomGateWay = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomGateWay);
exports.RoomGateWay = RoomGateWay;
//# sourceMappingURL=room.gateway.js.map