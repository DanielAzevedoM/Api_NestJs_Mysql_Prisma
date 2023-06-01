import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreatePersonDto } from "../dtos/create-person.dto";
import { PersonDto } from "../dtos/person.dto";
import { AccountDto } from "src/module/account/dtos/account.dto";
import { UpdatePersonDto } from "../dtos/update-person.dto";

@Injectable()
export class PersonRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePersonDto): Promise<CreatePersonDto>{
    return this.prisma.person.create({ data });
  }

  async find(id: string): Promise<PersonDto>{
    return this.prisma.person.findUnique({ where: { id }});
  }

  async findAll(): Promise<PersonDto[]>{
    return this.prisma.person.findMany();
  }

  async update(id: string, data: UpdatePersonDto): Promise<UpdatePersonDto>{
    return this.prisma.person.update({ where: { id }, data: { ...data }})
  }

  async delete(id: string): Promise<PersonDto>{
    const account = await this.prisma.account.findFirst({ where: { personId: id }});
    if(account) await this.prisma.account.update({ where: {personId: id}, data: { personId: null }});
    const result = await this.prisma.person.delete({ where: { id }});
    return result;
  }

  async updateAccountFk(accId: string, personId: string): Promise<AccountDto>{
    const account = await this.prisma.account.findUnique({ where: { id: accId }});
    if(account.personId !== null) await this.prisma.person.delete({ where: { id: account.personId} });
    return this.prisma.account.update({ where: { id: accId }, data: { personId }});
  }

  async verifyIsAdmin(id: string): Promise<AccountDto>{
    return this.prisma.account.findFirst({ where: { personId: id }});
  }
}
