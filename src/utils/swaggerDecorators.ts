import {
  ApiOperationOptions,
  ApiResponseOptions,
  ApiQueryOptions,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { applyDecorators, UsePipes, ValidationPipe } from '@nestjs/common';

interface SwaggerDocsUtil {
  operation: ApiOperationOptions;
  response: ApiResponseOptions;
  queries: ApiQueryOptions[];
  tag?: string;
}

export function Docs(options: SwaggerDocsUtil) {
  const decorators = [
    ApiOperation(options.operation),
    ApiResponse(options.response),
    UsePipes(new ValidationPipe({ transform: true })),
  ];

  if (options.tag) {
    decorators.unshift(ApiTags(options.tag));
  }

  options.queries.forEach((query) => {
    decorators.push(ApiQuery(query));
  });

  return applyDecorators(...decorators);
}
