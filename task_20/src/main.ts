import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { SubscriptionGuard } from './guards/user-subscription.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(loggerMiddleware)

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    // forbidNonWhitelisted:true,
    transform:true
  }))
// app.useGlobalGuards(app.get(SubscriptionGuard));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
