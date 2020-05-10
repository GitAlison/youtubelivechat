import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const cors = require('cors');
  const whitelist = ['http://localhost:4200', '*'];
  const corsOptions = {
    allowed:true,
  };

  const app = await NestFactory.create(AppModule, { cors: false });
  app.use(cors(corsOptions));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
