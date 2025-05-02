import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';
import { SmsModule } from 'src/sms/sms.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, MailModule, SmsModule, JwtModule.register({
    global: true,
    secret: "Nisa",
    signOptions: { expiresIn: '60d' },
  }), ]
})
export class UserModule {}
