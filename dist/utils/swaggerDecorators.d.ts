import { ApiOperationOptions, ApiResponseOptions, ApiQueryOptions } from '@nestjs/swagger';
interface SwaggerDocsUtil {
    operation: ApiOperationOptions;
    response: ApiResponseOptions;
    queries: ApiQueryOptions[];
    tag?: string;
}
export declare function Docs(options: SwaggerDocsUtil): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
