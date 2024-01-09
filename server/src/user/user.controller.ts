import { Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Patch('/:id/:action')
    async updateUser(@Param('id') id: string, @Param('action') action: string): Promise<string> {
        if (action == 'block') {
            const res = await this.userService.blockUser(id)
            return res
        } else if (action == 'delete') {
            const res = await this.userService.deleteUser(id)
            return res
        } else if (action == 'unblock') {
            const res = await this.userService.unblockUser(id)
            return res
        } else {
            return "Action not supported"
        }
    }

    @Post()
    async findAll(@Req() request: Request): Promise<any> {
        const res = await this.userService.findAll(request.body)
        return res
    }

}
