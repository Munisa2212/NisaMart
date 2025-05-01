import { BadRequestException, Injectable } from '@nestjs/common';
import { CheckingDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService){}

  async findUser(phone:  string){
    const user = this.prisma.user.findFirst({where: {phone}})
    return user
  }

  async register(data: CheckingDto) {
    const user = await this.findUser(data.phone)
    if(user){
      throw new BadRequestException("User already exists")
    }

    const hash = bcrypt.hashSync(data.password, 10)
    const newUser = await this.prisma.user.create({...data, password: hash})

  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
