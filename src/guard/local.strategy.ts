import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/module/auth/auth.service';
import { ValidateDto } from './dtos/validate.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: "email", passwordField: "password" });
    }

    async validate(email: string, password: string): Promise<ValidateDto> {
        const account = await this.authService.validateAccount(email, password);
        if (!account) throw new UnauthorizedException();
        return account;
    }
}
