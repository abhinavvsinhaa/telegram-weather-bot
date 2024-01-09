import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { PrismaService } from 'prisma.service';

@Module({
  imports: [],
  providers: [PrismaService, TelegramService]
})
export class TelegramModule {}
