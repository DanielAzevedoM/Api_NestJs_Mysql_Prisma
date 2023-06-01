import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  );
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  
  useContainer(app.select(AppModule), {fallbackOnErrors: true} );

  await app.listen(3000);
}
bootstrap();
