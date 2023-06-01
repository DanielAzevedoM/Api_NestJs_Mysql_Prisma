import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dtos/create-person.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { PersonDto } from './dtos/person.dto';
import { UpdatePersonDto } from './dtos/update-person.dto';


@Controller('account/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() data: CreatePersonDto): Promise<CreatePersonDto>{
    return this.personService.create(req.user.accId, req.user.email, data)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(@Req() req): Promise<PersonDto>{
    return this.personService.find(req.user.personId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async findAll(@Req() req): Promise<PersonDto[]>{
    return this.personService.findAll(req.user.personId)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Req() req, @Body() data: UpdatePersonDto): Promise<UpdatePersonDto>{
    return this.personService.update(req.user.personId, data)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req): Promise<PersonDto> {
    return this.personService.delete(req.user.personId)
  }
}
