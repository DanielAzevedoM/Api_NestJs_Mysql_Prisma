import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { AccountDto } from "../dtos/account.dto";
import { CreateAccountDto } from "../dtos/create-account.dto";
import { UpdateAccountDto } from "../dtos/update-account.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAccountDto): Promise<CreateAccountDto>{
    const encryptPassword = await bcrypt.hash(data.password, 10);
    data = {...data, password: encryptPassword};
    const result = this.prisma.account.create({ data });
    delete (await result).password
    return result;
  }

  async find(id: string ): Promise<AccountDto>{
    const result = this.prisma.account.findUnique({ where: { id } }); 
    delete (await result).password;
    return result;
  }

  async findAll(): Promise<AccountDto[]>{
    return this.prisma.account.findMany({ select: { 
      id: true, 
      email: true, 
      isMasterAccount: true,  
      isAdmin: true, 
      isDeleted: true, 
      personId: true }, 
      where: { isDeleted: false } });
  }

  async update(id:string, data: UpdateAccountDto): Promise<UpdateAccountDto>{
    const result = this.prisma.account.update({ where: { id }, data: { ...data } });
    delete (await result).password;
    return result;
  }

  async softDelete(id: string): Promise<UpdateAccountDto>{
    const result = this.prisma.account.update({ where: { id }, data: { isDeleted: true } });
    delete (await result).password;
    return result;
  }

  //Função que recebe email em data para verificação de Email utilizando class-validator no AccountDTO.
  async verifyEmailExists(email: string): Promise<AccountDto> {
    return this.prisma.account.findFirst({ where: { email } });
  }
  
  async verifyIsAdmin(id: string): Promise<AccountDto>{
    return this.prisma.account.findUnique({ where: { id }});
  }
}
