import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class OrderService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: CreateOrderDto, req: Request) {
    try {
      let id = req["user-id"]
      const one = await this.prisma.order.create({data: {...data, user_id: id}})
      return one
    } catch (error) {
      console.log(error)
      throw new BadRequestException("order create error")
    }
  }

  async findAll() {
    try {
      const one = await this.prisma.order.findMany({include: {
        User: {
          select: {
            id: true,
            email: true
          }
        },
        Product: {
          select: {
            id: true,
            name: true
          }
        }
      }})
      return one
    } catch (error) {
      console.log(error)
      throw new BadRequestException("order findall error")
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.order.findFirst({where: {id}})
      return one
    } catch (error) {
      console.log(error)
      throw new BadRequestException("order findone error")
    }
  }

  async update(id: string, data: UpdateOrderDto) {
    try {
      const one = await this.prisma.order.update({where: {id}, data})
      return one
    } catch (error) {
      console.log(error)
      throw new BadRequestException("order edit error")
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.order.delete({where: {id}})
      return one
    } catch (error) {
      console.log(error)
      throw new BadRequestException("order remove error")
    }
  }
}
