import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, } from 'class-validator';
import { AccountRepository } from 'src/module/account/repository/account.repository';


@Injectable()
@ValidatorConstraint({ async: true })
export class verifyEmailExistsConstraint implements ValidatorConstraintInterface {

  constructor(private readonly accountRepository: AccountRepository) { }

  async validate(email: string, args: ValidationArguments) {
    const account = await this.accountRepository.verifyEmailExists(email);
    if (account) return false;
    return true;
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: verifyEmailExistsConstraint,
    });
  };
}