import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService {
    private readonly bot: any
    private logger = new Logger(TelegramService.name)
    private readonly TELEGRAM_TOKEN: string = process.env.TELEGRAM_BOT_KEY

    constructor(private readonly prismaService: PrismaService, private readonly httpService: HttpService) {
        this.bot = new TelegramBot(this.TELEGRAM_TOKEN, { polling: true })

        this.bot.onText(/\/subscribe/, this.onSubscribe)
        this.bot.onText(/\/weather/, this.getWeatherUpdate)
        this.bot.onText(/\/unsubscribe/, this.unSubscribeFromDailyUpdates)
        this.bot.on("message", this.onReceiveMessage)
    }

    unSubscribeFromDailyUpdates = async (message: any, match: string) => {
        const user = await this.prismaService.user.findFirst({
            where: {
                chatId: String(message.chat.id)
            }
        })

        if (!user) {
            this.sendMessage(message.chat.id, "Sorry you are already unsubscribed")
            return
        } 

        await this.prismaService.user.delete({
            where: {
                chatId: String(message.chat.id)
            }
        })
        this.sendMessage(message.chat.id, "Sorry to see you go, you're unsubscribed from weather updates 🥺")
    }

    getWeatherUpdate = async (message: any, match: string) => {
        const user = await this.prismaService.user.findFirst({
            where: {
                chatId: String(message.chat.id)
            }
        })

        if (!user || user.isBlocked) {
            this.sendMessage(message.chat.id, "Sorry you cannot receive update")
            return
        } 

        const bot = await this.prismaService.bot.findFirst({})
        const data : any = await this.fetchWeatherUpdate(bot.weatherApiKey)
        this.sendMessage(user.chatId, `Your current weather update is here ✨\n\nCity: Noida\nCurrent temperature in celsius: ${data.current.temp_c}\nWeather condition: ${data.current.condition.text}\nWind speed in mph: ${data.current.wind_mph}`)
    }

    fetchWeatherUpdate = async (weatherApiKey: string) => {
         // fetching data from weatherAPI only for Noida as of now
         const { data } = await firstValueFrom(this.httpService.get(`https://api.weatherapi.com/v1/current.json?q=Noida&key=${weatherApiKey}`).pipe(catchError((error: any) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
        })))

        return data
    }

    @Cron('0 8 * * *')
    async sendRegularUpdates() {
        const users = await this.prismaService.user.findMany({})
        const bot = await this.prismaService.bot.findFirst({})

        const data : any = await this.fetchWeatherUpdate(bot.weatherApiKey)

        users.map(user => {
            if (!user.isBlocked) {
                this.sendMessage(user.chatId, `Your regular weather update is here ✨\n\nCity: Noida\nCurrent temperature in celsius: ${data.current.temp_c}\nWeather condition: ${data.current.condition.text}\nWind speed in mph: ${data.current.wind_mph}`)
            }
        })
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
                this.sendMessage(chatId, "Successfully subscribed ✨")
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
