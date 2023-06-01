import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { JwtTokenDto } from './dtos/jwt.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() account: LoginDto): Promise<JwtTokenDto> {
    return this.authService.login(account.email)
  }

}
