import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class LikeService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: CreateLikeDto, req: Request) {
    try {
      let id = req["user-id"]
      const previous = await this.prisma.like.findFirst({where: {user_id: id, product_id: data.product_id}})
      if(previous){
        return {message: "You already liked it"}
      }
      const one = await this.prisma.like.create({data: {...data, user_id: id}})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("like create error")
    }
  }

  async findAll(){
    try {
      const one = await this.prisma.like.findMany({include: {
        User: {
          select: {
            id: true,
            email: true
          }
        },
        Product: {
          select: {
            name: true
          }
        }
      }})
      return one
    } catch (error) {
      console.log(error)
      throw new BadRequestException("like findall error")
    }
  }

}
