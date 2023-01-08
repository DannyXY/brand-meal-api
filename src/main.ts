import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./app.module";
import { setupSwagger } from "./utils/swagger";

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.setGlobalPrefix("api");
  setupSwagger(app);
  await app.listen(3000);
}

bootstrap();
