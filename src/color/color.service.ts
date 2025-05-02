import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: CreateColorDto) {
    try {
      const one = await this.prisma.color.create({data})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("color create error")
    }
  }

  async findAll() {
    try {
      const one = await this.prisma.color.findMany()
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("color findall error")
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.color.findFirst({where: {id}})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("color findone error")
    }
  }

  async update(id: string, data: UpdateColorDto) {
    try {
      const one = await this.prisma.color.update({where: {id}, data})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("color edit error")
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.color.delete({where: {id}})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("color remove error")
    }
  }
}
