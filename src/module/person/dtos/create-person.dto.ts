import { IsNotEmpty, Length } from "class-validator";
import { IsCPF } from "class-validator-cpf";

export class CreatePersonDto {
    id?: string;

    @IsNotEmpty({ message: 'Name required' })
    @Length(1, 10, { message: 'Name must be between 3 and 10 characters' })
    name: string;

    @IsCPF()
    @IsNotEmpty({ message:"Digite um cpf válido"})
    cpf: string;

    employee?: boolean;

    @IsNotEmpty({ message: 'Gender required' })
    gender: string;
    
    selfie ?: string;
  
}