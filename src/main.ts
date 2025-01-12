import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {

  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);

  //Prefijo de la ruta
  app.setGlobalPrefix('api');
  //Para que tome las validaciones de los DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.useGlobalFilters(new RpcCustomExceptionFilter());
  await app.listen(envs.port);

  logger.log(`Server is running on ${await app.getUrl()}`);
  logger.log(`Server is running on port ${envs.port}`);
}
bootstrap();
