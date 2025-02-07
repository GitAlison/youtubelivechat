"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const room_gateway_1 = require("./room.gateway");
const room_service_1 = require("./room.service");
const typeorm_1 = require("@nestjs/typeorm");
const room_entity_1 = require("./room.entity");
const message_entity_1 = require("./message.entity");
const room_controller_1 = require("./room.controller");
const user_entity_1 = require("../user/user.entity");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("../auth/auth.module");
const auth_constants_1 = require("../auth/auth.constants");
let RoomModule = class RoomModule {
};
RoomModule = __decorate([
    common_1.Module({
        imports: [
            jwt_1.JwtModule.register({
                secret: auth_constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '99999s' },
            }),
            typeorm_1.TypeOrmModule.forFeature([room_entity_1.RoomEntity, message_entity_1.MessageEntity, user_entity_1.UserEntity]),
        ],
        providers: [room_gateway_1.RoomGateWay, room_service_1.RoomService],
        controllers: [room_controller_1.RoomController],
    })
], RoomModule);
exports.RoomModule = RoomModule;
//# sourceMappingURL=room.module.js.map