import { BadRequestException, Injectable } from '@nestjs/common';
import { CheckingDto, LoginUserDto, RegisterUserDto, VerifyOTPDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { MailService } from 'src/mail/mail.service';
import { SmsService } from 'src/sms/sms.service';
import { totp } from 'otplib';
import { JwtService } from '@nestjs/jwt';
import { UserStatus } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService, private readonly mailer: MailService, private readonly sms: SmsService, private jwtService: JwtService){}

  async findUser(email:  string){
    const user = this.prisma.user.findFirst({where: {email}})
    return user
  }

  async check(data: CheckingDto) {
    try {
      const user = await this.findUser(data.email)
      if(user){
        throw new BadRequestException("User already exists")
      }

      let otp = totp.generate(data.email + "email")
      console.log(otp, "otp")
      await this.mailer.sendMail(data.email, "One Time Password", otp)
      await this.sms.sendSMS(data.phone, "Bu Eskiz dan Test")

      return {message: "Otp Sended"}
    } catch (error) {
      console.log(error)
      throw new BadRequestException("check error")
    }
  }

  async verify(data: VerifyOTPDto){
    try {
      const user = await this.findUser(data.email)
      if(user){
        return {message: "User already exists"}
      }

      let match = totp.verify({token: data.otp, secret: data.email + "email"})
      if(!match){
        return {message: "Otp is not valid"}
      }

      return "Successfully confirmed"
    } catch (error) {
      console.log(error)
      throw new BadRequestException("verify error")
    }
  }

  async resend(data: CheckingDto){
    try {
      const user = await this.findUser(data.email)
      if(user){
        throw new BadRequestException("User already exists")
      }

      let otp = totp.generate(data.email + "email")
      console.log(otp, "otp")
      await this.mailer.sendMail(data.email, "One Time Password", otp)
      await this.sms.sendSMS(data.phone, "Bu Eskiz dan Test")

      return {message: "Sended"}
    } catch (error) {
      console.log(error)
      throw new BadRequestException("resend error")
    }
  }

  async register(data: RegisterUserDto) {
    try {
      const user = await this.findUser(data.email)
      if(user){
        return {message: "User already exists"}
      }
      const region = await this.prisma.region.findFirst({where: {id: data.region_id}})
      if(!region){
        return {message: "Wrong region id"}
      }
  
      const hash = bcrypt.hashSync(data.password, 10)
      const newUser = await this.prisma.user.create({data: {...data, password: hash, status: UserStatus.ACTIVE}})
      return newUser
    } catch (error) {
      console.log(error)
      throw new BadRequestException("register error")
    }
  }

  async login(data: LoginUserDto, req: Request) {
    try {
      const user = await this.findUser(data.email)
      if(!user){
        throw new BadRequestException("User not exists")
      }
      if(user.status == UserStatus.PENDING){
        throw new BadRequestException("Please register first")
      }

      await this.prisma.session.create({
        data: {
          userId: user.id,
          ip: req.ip || 'Unknown ip',
          device: req.headers['user-agent'] || 'Unknown device',
        },
      });
  
  
      const match = bcrypt.compareSync(data.password, user.password)
      if(!match){
        throw new BadRequestException("Password is wrong")
      }
  
      const jwt = this.jwtService.sign({id: user.id, role: user.role})
      return {jwt};
    } catch (error) {
      console.log(error)
      throw new BadRequestException("login error")
    }
  }

  async findOne(req: Request) {
    try {
      let id = req["user-id"]
      const user = await this.prisma.session.findMany({where: {userId: id}})
      return user;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("findone error")
    }
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const one = await this.prisma.user.update({where: {id}, data})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("edit error")
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.user.delete({where: {id}})
      return one;
    } catch (error) {
      console.log(error)
      throw new BadRequestException("remove error")
    }
  }

  async findAll() {
    try {
      const one = await this.prisma.user.findMany()
      return one
    } catch (error) {
      console.log(error)
      throw new BadRequestException("user findall error")
    }
  }
}
