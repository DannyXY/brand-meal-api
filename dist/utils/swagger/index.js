"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("./constants");
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle(constants_1.SWAGGER_API_NAME)
        .setDescription(constants_1.SWAGGER_API_DESCRIPTION)
        .setVersion(constants_1.SWAGGER_API_CURRENT_VERSION)
        .setBasePath(constants_1.SWAGGER_API_ROOT)
        .setContact("Brand Meal", null, null)
        .addBearerAuth()
        .build();
    const options = {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
    };
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup(constants_1.SWAGGER_API_ROOT, app, document);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=index.js.map