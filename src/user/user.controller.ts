import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CheckingDto, LoginUserDto, RegisterUserDto, VerifyOTPDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RbucGuard } from 'src/guards/rbuc.guard';
import { Roles } from './decorators/rbuc.decorators';
import { rolesEnum } from './enum/role.enum';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("check")
  check(@Body() createUserDto: CheckingDto) {
    return this.userService.check(createUserDto);
  }

  @Post("verifyOtp")
  verify(@Body() createUserDto: VerifyOTPDto) {
    return this.userService.verify(createUserDto);
  }

  @Post("resendOtp")
  resend(@Body() createUserDto: CheckingDto) {
    return this.userService.resend(createUserDto);
  }

  @Post("register")
  register(@Body() createUserDto: RegisterUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post("login")
  login(@Body() createUserDto: LoginUserDto, @Req() req: Request) {
    return this.userService.login(createUserDto, req);
  }

  @Roles(rolesEnum.USER)
  @UseGuards(RbucGuard)
  @UseGuards(AuthGuard)
  @Get("me")
  findOne(@Req() req: Request) {
    return this.userService.findOne(req);
  }

  @Roles(rolesEnum.SUPERADMIN)
  @UseGuards(RbucGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Roles(rolesEnum.ADMIN)
  @UseGuards(RbucGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
