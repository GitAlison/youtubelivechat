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
const typeorm_1 = require("@nestjs/typeorm");
const room_entity_1 = require("./room.entity");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./message.entity");
const user_entity_1 = require("../user/user.entity");
let RoomService = class RoomService {
    constructor(roomRepository, messageRepository) {
        this.roomRepository = roomRepository;
        this.messageRepository = messageRepository;
    }
    async createRoom(video) {
        console.log(video);
        let room = await this.roomRepository.findOne({ where: { video } });
        if (room) {
            return room;
        }
        else {
            let room = this.roomRepository.create({ video });
            return await this.roomRepository.save(room);
        }
    }
    async createMessage(data) {
        const video = await this.roomRepository.findOne({
            video: data.content.video,
        });
        if (!video) {
            const room = await this.roomRepository
                .create({ video: data.content.video })
                .save();
            return this.messageRepository
                .create({
                user: data.user,
                room: room,
                text: data.content.text,
            })
                .save();
        }
        try {
            let newMessage = await this.messageRepository
                .create({
                user: data.user,
                room: video,
                text: data.content.text,
            })
                .save();
            let objectResponse = {
                id: newMessage.id,
                text: newMessage.text,
                user: data.user,
                room: video.video,
                created: newMessage.created,
            };
            return objectResponse;
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException('User Not found');
        }
    }
    async findAllMessages(video) {
        let room = await this.roomRepository.findOne({ where: { video: video } });
        if (room) {
            return this.messageRepository.find({
                where: { room: { id: room.id } },
                relations: ['user'],
            });
        }
        throw new common_1.NotFoundException('Sala Nao encontrada');
    }
    findAll() {
        return this.roomRepository.find();
    }
};
RoomService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(room_entity_1.RoomEntity)),
    __param(1, typeorm_1.InjectRepository(message_entity_1.MessageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map