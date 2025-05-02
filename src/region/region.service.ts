import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: CreateRegionDto) {
    try {
      const one = await this.prisma.region.create({data})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("region create error")
    }
  }

  async findAll() {
    try {
      const one = await this.prisma.region.findMany({include: {
        users: {
          select: {
            id: true,
            email: true
          }
        }
      }})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("region findall error")
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.region.findFirst({where: {id}})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("region findone error")
    }
  }

  async update(id: string, data: UpdateRegionDto) {
    try {
      const one = await this.prisma.region.update({where: {id}, data})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("region edit error")
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.region.delete({where: {id}})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("region clear error")
    }
  }
}
