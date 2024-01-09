import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { PrismaService } from 'prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
      maxRedirects: 5,
    })
  })
  ],
  providers: [PrismaService, TelegramService]
})
export class TelegramModule {}
