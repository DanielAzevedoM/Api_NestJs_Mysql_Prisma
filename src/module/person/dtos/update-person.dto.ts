import { IsOptional } from "class-validator";
import { IsCPF } from "class-validator-cpf";

export class UpdatePersonDto {
    @IsOptional()
    name?: string;
    @IsOptional()
    gender?: string;
    @IsCPF()
    @IsOptional()
    cpf?: string;

}