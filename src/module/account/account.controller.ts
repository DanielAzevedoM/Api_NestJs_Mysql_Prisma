import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { AccountService } from './account.service';
import { AccountDto } from './dtos/account.dto';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';


@Controller('account')
export class AccountController {

    constructor(private readonly accountService: AccountService) { }

    @Post()
    create(@Body() data: CreateAccountDto): Promise<CreateAccountDto> {
        return this.accountService.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/data')
    find(@Request() req): Promise<AccountDto> {
        return this.accountService.find(req.user.accId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/data/list')
    findAll(@Request() req): Promise<AccountDto[]> {
        return this.accountService.findAll(req.user.accId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update')
    update(@Request() req, @Body() updateAccountDto: UpdateAccountDto): Promise<UpdateAccountDto> {
        return this.accountService.update(req.user.accId, updateAccountDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    delete(@Request() req): Promise<UpdateAccountDto> {
        return this.accountService.softDelete(req.user.accId);
    }
}