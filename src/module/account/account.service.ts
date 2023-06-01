import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountDto } from './dtos/account.dto';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { AccountRepository } from './repository/account.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {

    constructor(private accountRepository: AccountRepository) { }

    async create(data: CreateAccountDto): Promise<CreateAccountDto> {
        const result = await this.accountRepository.create(data);
        if (!result) throw new HttpException(`Could not create new account`, HttpStatus.BAD_REQUEST);
        return result;
    }

    async find(id: string): Promise<AccountDto> {
        const result = await this.accountRepository.find(id);
        if (!result) throw new HttpException(`Could not find a account`, HttpStatus.BAD_REQUEST);
        return result;
    }

    async findAll(id: string): Promise<AccountDto[]> {
        const account =  await this.accountRepository.verifyIsAdmin(id);
        if(account.isAdmin == false) throw new HttpException(`Only admin can acess`, HttpStatus.BAD_REQUEST);
        const result = await this.accountRepository.findAll();
        if (!result) throw new HttpException(`Could not find accounts`, HttpStatus.BAD_REQUEST);
        return result;
    }

    async update(id: string, data: UpdateAccountDto): Promise<UpdateAccountDto> {
        if(data.password) {
            const encryptPassword = await bcrypt.hash(data.password, 10);
            data = {...data, password: encryptPassword }
        };
        const result = await this.accountRepository.update(id, data);
        if (!result) throw new HttpException(`Could not update account`, HttpStatus.BAD_REQUEST);
        return result;
    }

    async softDelete(id: string): Promise<UpdateAccountDto> {
        const result = await this.accountRepository.softDelete(id);
        if (!result) throw new HttpException(`Could not delete account`, HttpStatus.BAD_REQUEST);
        return result;
    }
}
