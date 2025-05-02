import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: CreateCommentDto, req: Request) {
    try {
      let id = req["user-id"]
      const one = await this.prisma.comment.create({data: {
        ...data,
        user_id: id
      }})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("comment create error")
    }
  }

  async findAll() {
    try {
      const one = await this.prisma.comment.findMany({include: {
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
      } })
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("comment findall error")
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.comment.findFirst({where: {id}})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("comment findone error")
    }
  }

  async update(id: string, data: UpdateCommentDto) {
    try {
      const one = await this.prisma.comment.update({where: {id}, data})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("comment edit error")
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.comment.delete({where: {id}})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("comment remove error")
    }
  }
}
