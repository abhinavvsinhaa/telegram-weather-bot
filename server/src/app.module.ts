import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { PrismaService } from 'prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), TelegramModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }