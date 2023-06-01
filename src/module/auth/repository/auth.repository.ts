import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { LoginDto } from "../dtos/login.dto";
import { PayloadDto } from "../dtos/payload.dto";


@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(email: string): Promise<LoginDto>{
    return this.prisma.account.findFirst({ where: { email } });
  }

  async login(email: string): Promise<PayloadDto>{
    const account = await this.prisma.account.findFirst({ where: { email } });
    const payload = { email: account.email, sub: account.id, personId: account.personId };  
    return payload;
  }
}
