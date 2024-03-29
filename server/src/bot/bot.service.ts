import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class BotService {
    constructor(private prismaService: PrismaService) {}

    async updateBotKey(body: any): Promise<string> {
        try {    
            const bot = await this.prismaService.bot.findFirst({})
    
            if (!bot) {
                return "config could not be updated"
            }
    
            await this.prismaService.bot.update({
                where: {
                    id: bot.id
                },
                data: {
                    weatherApiKey: body.weatherApiKey
                }
            })
    
            return "config updated!!"
        } catch (error) {
            console.error("error in bot service while updating config: ", error)
            return "config could not be updated"
        }
    }
}
