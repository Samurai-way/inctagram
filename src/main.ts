import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { createApp } from './commons/createApp';
import { get } from 'http';
import { createWriteStream } from 'fs';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const PORT = process.env.PORT || 3000;
const serverUrl = 'http://localhost:3000';

async function bootstrap() {
  const origin = [
    'https://instagram-ui-nine.vercel.app',
    'http://localhost:3000',
    '*',
  ];
  const rawApp = await NestFactory.create(AppModule, {
    rawBody: true,
    cors: {
      origin,
    },
  });
  const getCorsOptions = (origin: string[]): CorsOptions => ({
    origin,
    credentials: true,
  });
  const app = createApp(rawApp);
  app.enableCors(getCorsOptions(origin));
  await app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`);
  });
  if (process.env.NODE_ENV === 'development') {
    console.log('DEVELOP', process.env.NODE_ENV);
    get(`${serverUrl}/swagger/swagger-ui-bundle.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
      console.log(
        `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
      );
    });
    get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
      console.log(
        `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
      );
    });
    get(
      `${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
        );
      },
    );

    get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
      );
    });
  }
}

bootstrap();
