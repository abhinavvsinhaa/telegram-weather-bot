import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [BotController],
  providers: [PrismaService, BotService]
})
export class BotModule {}
