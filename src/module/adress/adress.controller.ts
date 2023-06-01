import { Controller } from '@nestjs/common';
import { AdressService } from './adress.service';

@Controller('adress')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}
}
