import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: CreateCategoryDto) {
    try {
      const one = await this.prisma.category.create({data})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("category create error")
    }
  }

  async findAll() {
    try {
      const one = await this.prisma.category.findMany({include: {
        products: {
          select: {
            id: true,
            name: true
          }
        }
      } })
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("category findall error")
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.category.findFirst({where: {id}})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("category findone error")
    }
  }

  async update(id: string, data: UpdateCategoryDto) {
    try {
      const one = await this.prisma.category.update({where: {id}, data})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("category edit error")
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.category.delete({where: {id}})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("category remove error")
    }
  }
}
