import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService {
    private readonly bot: any
    private logger = new Logger(TelegramService.name)
    private readonly TELEGRAM_TOKEN: string = process.env.TELEGRAM_BOT_KEY

    constructor(private readonly prismaService: PrismaService) {
        this.bot = new TelegramBot(this.TELEGRAM_TOKEN, { polling: true })

        this.bot.onText(/\/subscribe/, this.onSubscribe)
        this.bot.on("message", this.onReceiveMessage)
    }
    
    onSubscribe = (message: any, match: string) => {
        (async (chatId: string, username: string): Promise<any> => {
            try {
                let user = await this.prismaService.user.findUnique({
                    where: {
                        chatId
                    }
                })
                if (user) {
                    this.sendMessage(chatId, "You've already subscribed")
                    return
                }

                user = await this.prismaService.user.create({
                    data: {
                        username,
                        chatId
                    }
                })

                this.logger.debug("user created", user)
                this.sendMessage(chatId, "successfully subscribed ✨")
            } catch (error) {
                this.logger.debug("error in finding and creating a user: ", error)
            }
        })(String(message.chat.id), String(message.chat.username));
    }

    onReceiveMessage = (message: any) => {
        this.logger.debug(message)
    }

    sendMessage = (chatId: string, message: string) => {
        this.bot.sendMessage(chatId, message)
    }
}
