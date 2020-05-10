"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const cors = require('cors');
    const whitelist = ['http://localhost:4200', '*'];
    const corsOptions = {
        allowed: true,
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: false });
    app.use(cors(corsOptions));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map