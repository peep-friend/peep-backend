import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setUpSwagger from './global/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger 환경설정 연결
  setUpSwagger(app);

  await app.listen(3000);
}
bootstrap();
