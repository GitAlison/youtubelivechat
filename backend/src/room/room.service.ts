import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async createRoom(video: string): Promise<any> {
    console.log(video);
    let room = await this.roomRepository.findOne({ where: { video } });
    if (room) {
      return room;
    } else {
      let room = this.roomRepository.create({ video });
      console.log(room);
      return await this.roomRepository.save(room);
    }
  }

  async createMessage(message: any): Promise<any> {
    const room = await this.roomRepository.findOne({ video: message.video });
    console.log(message);
    if (!room) {
      let room = await this.roomRepository.create({ video: message.video });
      await this.roomRepository.save(room);

      let newMessage = this.messageRepository.create({
        room: room,
        text: message['text'],
      });
      return this.messageRepository.save(newMessage);
    }
    let newMessage = this.messageRepository.create({
      room: room,
      text: message['text'],
    });
    return this.messageRepository.save(newMessage);
  }

  async findAllMessages(): Promise<any[]> {
    let messages = this.messageRepository.find();
    return messages;
  }

  findAll(): Promise<RoomEntity[]> {
    return this.roomRepository.find();
  }
}
