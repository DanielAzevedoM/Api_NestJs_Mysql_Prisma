import { IsEmail, IsOptional } from "class-validator";
import { IsUserAlreadyExist } from "src/validators/verifyEmailExists";

export class UpdateAccountDto {
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email' })
    @IsUserAlreadyExist({ message: `Email already exists` })
    email?: string;

    @IsOptional()
    password?: string;
}