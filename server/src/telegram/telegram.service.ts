import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService {
    private readonly bot: any
    private logger = new Logger(TelegramService.name)
    private readonly TELEGRAM_TOKEN: string = process.env.TELEGRAM_BOT_KEY

    constructor(@InjectModel(User.name) private userModel: Model<User>) {
        this.bot = new TelegramBot(this.TELEGRAM_TOKEN, { polling: true })

        this.bot.onText(/\/subscribe (.+)/, this.onSubscribe)
        this.bot.on("message", this.onReceiveMessage)
    }
    
    onSubscribe = (message: any, match: string) => {

    }

    onReceiveMessage = (message: any) => {
        this.logger.debug(message)
    }

    sendMessage = (chatId: string, message: string) => {
        this.bot.sendMessage(chatId, message)
    }
}
