import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtTokenDto } from './dtos/jwt.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthRepository } from './repository/auth.repository';

@Injectable()
export class AuthService {

    constructor(private authRepository: AuthRepository, private jwtService: JwtService) { }

    async validateAccount(email: string, pass: string): Promise<LoginDto> {
        const account = await this.authRepository.find(email); 
        const comparePasswords = await bcrypt.compare(pass, account.password);
        if (comparePasswords) return account;
        return null;
    }

    async login(email: string): Promise<JwtTokenDto> {
        const payload = await this.authRepository.login(email); 
        return { access_token: this.jwtService.sign(payload) };
    }
}
