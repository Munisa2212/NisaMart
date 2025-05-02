import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto, CreateMessageDto, GetChat } from './dto/create-chat.dto';
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
    const one = await this.prisma.chatMessage.create({data: {
      ...data,
      createdAt: new Date()
    }})

    return {message: data.message}
  }

  async findChatMessages(chatId: number) {
    try {
      const one =  await this.prisma.chatMessage.findMany();
      const result = one.filter((element) => element.chatId == chatId)

      if (result.length === 0) {
        return {message: 'No messages found'}
      }

      return result
    } catch (error) {
      throw new BadRequestException('Error fetching messages');
    }
  }
}
