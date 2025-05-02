import { Controller, Get, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { SessionsService } from './sessions.service';
import { rolesEnum } from 'src/user/enum/role.enum';
import { Roles } from 'src/user/decorators/rbuc.decorators';
import { RbucGuard } from 'src/guards/rbuc.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @UseGuards(RbucGuard)
  @UseGuards(AuthGuard)
  @Get("me")
  findOne(@Req() req: Request) {
    return this.sessionsService.findOne(req);
  }


  @Roles(rolesEnum.ADMIN)
  @UseGuards(RbucGuard)
  @UseGuards(AuthGuard)
  @Delete()
  removeAll(@Req() req: Request) {
    return this.sessionsService.removeAll(req);
  }

}

