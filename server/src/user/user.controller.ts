import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async findAll(@Req() request: Request): Promise<any> {
        const res = await this.userService.findAll(request.body)
        return res
    }

}
