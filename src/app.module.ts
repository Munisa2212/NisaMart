import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { SmsModule } from './sms/sms.module';
import { RegionModule } from './region/region.module';
import { CategoryModule } from './category/category.module';
import { ColorModule } from './color/color.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UserModule, PrismaModule, MailModule, SmsModule, RegionModule, CategoryModule, ColorModule, CommentModule, LikeModule, ProductModule, OrderModule, ChatModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
