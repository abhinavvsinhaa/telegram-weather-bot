import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async findAll(): Promise<User[]> {        
        const users = await this.prismaService.user.findMany({})
        return users.filter(user => user.isAdmin != true)
    }

    async deleteUser(id: string): Promise<string> {
        const user = await this.prismaService.user.findFirst({
            where: {
                id
            }
        })

        if (!user || user.isAdmin) {
            return "Sorry the action cannot be completed"
        }

        await this.prismaService.user.delete({
            where: {
                id
            }
        })

        return "User deleted"
    }

    async blockUser(id: string): Promise<string> {
        const user = await this.prismaService.user.findFirst({
            where: {
                id
            }
        })

        if (!user || user.isAdmin) {
            return "Sorry the action cannot be completed"
        }

        await this.prismaService.user.update({
            where: {
                id
            },
            data: {
                isBlocked: true
            }
        })

        return "User blocked"
    }

    async unblockUser(id: string): Promise<string> {
        const user = await this.prismaService.user.findFirst({
            where: {
                id
            }
        })

        if (!user || user.isAdmin) {
            return "Sorry the action cannot be completed"
        }

        await this.prismaService.user.update({
            where: {
                id
            },
            data: {
                isBlocked: false
            }
        })

        return "User unblocked"
    }
}
