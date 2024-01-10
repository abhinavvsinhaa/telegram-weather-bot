import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' }
  })],
  providers: [PrismaService, AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
