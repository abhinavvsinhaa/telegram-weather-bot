import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async findAll(@Req() request: Request): Promise<any> {
        const res = await this.userService.findAll(request.body)
        return res
    }

}
