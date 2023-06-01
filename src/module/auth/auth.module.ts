import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/guard/constants';
import { LocalStrategy } from 'src/guard/local.strategy';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { JwtStrategy } from 'src/guard/jwt.strategy';
import { AccountRepository } from '../account/repository/account.repository';
import { AuthRepository } from './repository/auth.repository';



@Module({
  imports: [PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '2d' }})],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, LocalStrategy, PrismaService, AccountRepository, JwtAuthGuard, JwtStrategy],
  exports: [JwtModule]
})
export class AuthModule {}
