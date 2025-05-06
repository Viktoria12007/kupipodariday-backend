import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  // app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  // app.useGlobalInterceptors(new TypeOrmErrorMapperInterceptor());
  // app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('КупиПодариДай')
    .setDescription('КупиПодариДай API описание')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
