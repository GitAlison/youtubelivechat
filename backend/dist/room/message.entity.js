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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const room_entity_1 = require("./room.entity");
let MessageEntity = class MessageEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MessageEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MessageEntity.prototype, "text", void 0);
__decorate([
    typeorm_1.Column({ default: Date() }),
    __metadata("design:type", Date)
], MessageEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => room_entity_1.RoomEntity, { nullable: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", room_entity_1.RoomEntity)
], MessageEntity.prototype, "room", void 0);
MessageEntity = __decorate([
    typeorm_1.Entity('message')
], MessageEntity);
exports.MessageEntity = MessageEntity;
//# sourceMappingURL=message.entity.js.map