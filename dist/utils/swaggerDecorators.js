"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Docs = Docs;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
function Docs(options) {
    const decorators = [
        (0, swagger_1.ApiOperation)(options.operation),
        (0, swagger_1.ApiResponse)(options.response),
        (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    ];
    if (options.tag) {
        decorators.unshift((0, swagger_1.ApiTags)(options.tag));
    }
    options.queries.forEach((query) => {
        decorators.push((0, swagger_1.ApiQuery)(query));
    });
    return (0, common_1.applyDecorators)(...decorators);
}
//# sourceMappingURL=swaggerDecorators.js.map