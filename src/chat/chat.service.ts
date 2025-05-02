import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatDto, CreateMessageDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: CreateChatDto) {
    try {
      const { fromId, toId } = data;
  
      const existing = await this.prisma.chat.findFirst({
        where: {
          OR: [
            { fromId, toId },
            { fromId: toId, toId: fromId }
          ]
        }
      });
  
      if (existing) return existing;
  
      return this.prisma.chat.create({
        data: { fromId, toId },
      });
    } catch (error) {
      throw new BadRequestException('Error creating chat');
    }
  }

  async sendMessage(data: CreateMessageDto){
    this.prisma.chatMessage.create({data: {
      ...data,
      createdAt: new Date()
    }})

    return data.message
  }

}
