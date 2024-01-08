import { Injectable, Logger } from '@nestjs/common';
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService {
    private readonly bot: any
    private logger = new Logger(TelegramService.name)
    private readonly TELEGRAM_TOKEN: string = process.env.TELEGRAM_BOT_KEY

    constructor() {
        this.bot = new TelegramBot(this.TELEGRAM_TOKEN, { polling: true })

        this.bot.on("message", this.onReceiveMessage)
    }
    
    onReceiveMessage = (message: any) => {
        this.logger.debug(message)
    }

    sendMessage = (chatId: string, message: string) => {
        this.bot.sendMessage(chatId, message)
    }
}
