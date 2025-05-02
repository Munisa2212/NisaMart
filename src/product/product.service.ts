import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ProductService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: CreateProductDto, req: Request) {
    try {
      let id = req["user-id"]

      const category = await this.prisma.category.findFirst({where: {id: data.category_id}})
      if(!category){
        throw new BadRequestException("Catgegory not found")
      }

      const newCost = data.price * ((100-data.discount)/100)
      
      const one = await this.prisma.product.create({
        data: {
          name: data.name,
          description: data.description,
          count: data.count,
          image: data.image,
          category_id: data.category_id,
          discount: data.discount,
          price: newCost,
          type: data.type,
          condition: data.condition,
          user_id: id,
          avarage_star: 0,
          productColors: {
            create: data.colors.map((colorId) => ({
              color: {
                connect: { id: colorId },
              },
            })),
          },
        },
      });
      
      return one
    } catch (error) {
      console.log(error)
      throw new BadRequestException("Error")
    }
  }

  async findAll(name: string, category_id: string, limit: number, page: number, sortOrder: 'asc' | 'desc' = 'asc') {
    try {

      const take = Number(limit);
      let skip = (Number(page) - 1) * take;
      const query: any = {};

      if (name) {
        query.name = name;
      }
    
      if (category_id) {
        query.category_id = category_id;
      }
    
      skip = (page - 1) * limit;

      const products = await this.prisma.product.findMany({
        where: query,
        skip,
        take,
        orderBy: {
          price: sortOrder,
        },
        include: {
          Category: {
            select: {
              name: true,
              type: true,
            },
          },
          User: {
            select: {
              email: true,
            },
          },
          productColors: {
            include: {
              color: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      return products
    } catch (error) {
      console.log(error)
      throw new BadRequestException("Error")
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.product.findFirst({where: {id}})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("Error")
    }
  }

  async update(id: string, data: UpdateProductDto) {
    try {
      const one = await this.prisma.product.update({where: {id}, data})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("Error")
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.product.delete({where: {id}})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("Error")
    }
  }
}
