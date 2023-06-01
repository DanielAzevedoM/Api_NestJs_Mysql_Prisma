import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'Invalid email' })
    email: string;
    @IsNotEmpty({ message: 'Password required' })
    password: string;
    
}