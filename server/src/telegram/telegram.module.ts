import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [TelegramService]
})
export class TelegramModule {}
