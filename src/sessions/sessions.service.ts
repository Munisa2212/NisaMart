import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async findOne(req: Request) {
    let id = req["user-id"]
    try {
      return await this.prisma.session.findFirst({
        where: { userId : id},
      });
    } catch (error) {
      throw new Error('Error fetching user session');
    }
  }


  async removeAll(req: Request) {
    let id = req["user-id"]
    try {
      const one = await this.prisma.session.deleteMany({where: {userId: id}});
      return one
    } catch (error) {
      throw new Error('Error deleting all sessions');
    }
  }

}

