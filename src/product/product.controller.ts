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

  @ApiQuery({
    name: "name",
    example: "Iphone 14",
    required: false
  })
  @ApiQuery({
    name: "category_id",
    example: "c9f79b23-46ad-485c-9fd8-2fadb428ea46",
    required: false
  })
  @ApiQuery({
    name: "limit",
    example: 5,
    default: 10,
    required: false
  })
  @ApiQuery({
    name: "page",
    example: 2,
    default: 1,
    required: false
  })
  @Get()
  findAll(@Query("name") name?, @Query("category_id") category_id?, @Query("limit") limit = 10, @Query("page") page = 1) {
    return this.productService.findAll(name, category_id, limit, page);
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
