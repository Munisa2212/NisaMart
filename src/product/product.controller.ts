import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/user/decorators/rbuc.decorators';
import { rolesEnum } from 'src/user/enum/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RbucGuard } from 'src/guards/rbuc.guard';
import { Request } from 'express';
import { ApiQuery } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(rolesEnum.ADMIN)
  @UseGuards(RbucGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    return this.productService.create(createProductDto, req);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'category_id', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'type', required: false, enum: ProductType })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], default: 'asc' })
  async findAll(
    @Query('name') name: string,
    @Query('category_id') category_id: string,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('type') type: ProductType,
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    return this.productService.findAll(name, category_id, limit, page, type, sortOrder);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Roles(rolesEnum.SUPERADMIN)
  @UseGuards(RbucGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Roles(rolesEnum.ADMIN)
  @UseGuards(RbucGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
