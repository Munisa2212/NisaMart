import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto, CreateMessageDto, GetChat } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("chat")
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Post("message")
  sendMessage(@Body() createChatDto: CreateMessageDto) {
    return this.chatService.sendMessage(createChatDto);
  }

  @Get("chatMessages")
  @ApiQuery({ name: 'chatId', required: true, type: Number, example: 1 })
  findChatMessages(
    @Query('chatId') chatId: number
  ) {
    return this.chatService.findChatMessages(chatId);
  }

}
