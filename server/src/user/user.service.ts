import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async findAll(body: any): Promise<User[]> {
        const user = await this.prismaService.user.findFirst({
            where: {
                username: body.username
            }
        })

        if (!user || !user.isAdmin || user.password != body.password ) {
            return []
        }
        
        const users = await this.prismaService.user.findMany({})
        return users.filter(user => user.isAdmin != true)
    }
}
