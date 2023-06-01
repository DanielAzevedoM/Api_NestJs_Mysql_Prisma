import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import {  APP_INTERCEPTOR  } from '@nestjs/core';
import { AccountModule } from './module/account/account.module';
import { AuthModule } from './module/auth/auth.module';
import { PersonModule } from './module/person/person.module';
import { AdressModule } from './module/adress/adress.module';
import { CategoryModule } from './module/category/category.module';
import { ProductModule } from './module/product/product.module';


@Module({
  imports: [AccountModule, AuthModule, PersonModule, AdressModule, CategoryModule, ProductModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    
  ],
})

export class AppModule {}
