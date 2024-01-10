import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma.service';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

    async signIn(username: string, pass: any) {
        const user = await this.prismaService.user.findFirst({
            where: {
                username
            }
        })

        if (!user || !user.isAdmin || user?.password != pass) {
            throw new UnauthorizedException()
        }

        const payload = { sub: user.id, username: user.username }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
