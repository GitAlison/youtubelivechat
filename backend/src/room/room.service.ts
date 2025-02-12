import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async createRoom(video: string): Promise<any> {
    let room = await this.roomRepository.findOne({ where: { video } });
    if (room) {
      return room;
    } else {
      let room = this.roomRepository.create({ video });
      return await this.roomRepository.save(room);
    }
  }

  async createMessage(data: any): Promise<any> {
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
    } catch (error) {
      throw new NotFoundException('Usuario não encontrado');
    }
  }

  async findAllMessages(video): Promise<any[]> {
    let room = await this.roomRepository.findOne({ where: { video: video } });
    if (room) {
      return this.messageRepository.find({
        where: { room: { id: room.id } },
        relations: ['user'],
      });
    } else {
      const room = await this.roomRepository.create({ video }).save();
      return this.messageRepository.find({
        where: { room: { id: room.id } },
        relations: ['user'],
      });
    }
  }

  findAll(): Promise<RoomEntity[]> {
    return this.roomRepository.find();
  }
}
