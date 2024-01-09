import { Controller, Patch, Req } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
    constructor(private botService: BotService) {}

    @Patch() 
    async updateBotConfiguration(@Req() request: Request) {
        const res = await this.botService.updateBotKey(request.body)
        return res
    }
}
