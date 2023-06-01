import { IsEmail, IsNotEmpty } from "class-validator";
import { IsUserAlreadyExist } from "src/validators/verifyEmailExists";

export class CreateAccountDto {
    id?: string;

    @IsEmail({}, { message: 'Invalid email' })
    @IsUserAlreadyExist({ message: `Email already exists` })
    email: string;

    isMasterAccount: boolean;
    isAdmin: boolean;
    isDeleted: boolean;

    @IsNotEmpty({ message: 'Password required' })
    password: string;
}