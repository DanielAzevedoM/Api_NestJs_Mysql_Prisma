import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonRepository } from './repository/person.repository';
import { PrismaService } from 'src/database/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports:[PassportModule, AuthModule],
  controllers: [PersonController],
  providers: [PersonService, PersonRepository, PrismaService]
})

export class PersonModule {}
