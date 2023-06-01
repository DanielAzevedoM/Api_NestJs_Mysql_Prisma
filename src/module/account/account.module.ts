import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { verifyEmailExistsConstraint } from 'src/validators/verifyEmailExists';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from './repository/account.repository';


@Module(
{
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, PrismaService, verifyEmailExistsConstraint]
})
export class AccountModule {}
