import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PersonRepository } from './repository/person.repository';
import { CreatePersonDto } from './dtos/create-person.dto';
import { PersonDto } from './dtos/person.dto';
import { UpdatePersonDto } from './dtos/update-person.dto';
import { JwtTokenDto } from '../auth/dtos/jwt.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class PersonService {
    constructor(
        private readonly personRepository: PersonRepository,
        private readonly jwtService: JwtService,
        ){}

    async create(accId: string, email: string, data: CreatePersonDto ): Promise<CreatePersonDto & JwtTokenDto> {
        const result = await this.personRepository.create(data);
        if(!result) throw new HttpException(`Could not create new person`, HttpStatus.BAD_REQUEST);
        const updateFk = await this.personRepository.updateAccountFk(accId, result.id)
        if(!updateFk) throw new HttpException(`Could not update Fk in Account(PersonId)`, HttpStatus.BAD_REQUEST);
        const updatedAcessToken = this.jwtService.sign({ sub: accId, email, personId: result.id });
        if(!updatedAcessToken) throw new HttpException(`Updated Acess Token Error`, HttpStatus.BAD_REQUEST);
        return {...result, access_token: updatedAcessToken}
    }

    async find(id: string): Promise<PersonDto>{
        const result = await this.personRepository.find(id);
        if(!result) throw new HttpException(`Could not find a person`, HttpStatus.BAD_REQUEST);
        return result;
    }

    async findAll(id: string): Promise<PersonDto[]>{
        const account = await this.personRepository.verifyIsAdmin(id);
        if(account.isAdmin == false) throw new HttpException(`Only admin can acess`, HttpStatus.BAD_REQUEST);
        const result = await this.personRepository.findAll();
        if(!result) throw new HttpException(`Only admin can acess`, HttpStatus.BAD_REQUEST);
        return result;
    }

    async update(id: string, data: UpdatePersonDto): Promise<UpdatePersonDto>{
        const result = await this.personRepository.update(id, data);
        if(!result) throw new HttpException(`Could not update person`, HttpStatus.BAD_REQUEST);
        return result;
    }

    async delete(id: string): Promise<PersonDto>{
        const result = await this.personRepository.delete(id);
        if(!result) throw new HttpException(`Could not delete person`, HttpStatus.BAD_REQUEST);
        return result;
    }
}
