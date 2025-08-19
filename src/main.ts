import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JwtAuthGuard } from './utils/jwt-auth.guard';

console.log('ALL ENV', process.env);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<string>('ENVIRONMENT') || 'development';

  // Helmet for security
  app.use(helmet());

  // Dynamic CORS
  if (nodeEnv === 'development') {
    app.enableCors({ origin: '*' });
  } else {
    const allowedOrigins =
      configService.get<string>('cors_origins')?.split(',').filter(Boolean) ||
      [];

    app.enableCors({ origin: allowedOrigins });
  }

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Zingvel API')
    .setDescription('API documentation for Zingvel')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  // Port
  const port = configService.get<number>('PORT') || 3434;
  await app.listen(port, '0.0.0.0');
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/swagger`);
}
bootstrap();
