import { ApiOperationOptions, ApiQueryOptions, ApiResponseOptions } from '@nestjs/swagger';
export declare const getProductOperationStatus: ApiOperationOptions;
export declare const getProductsResponseStatus: ApiResponseOptions;
export declare const getProductQueryStatus: ApiQueryOptions[];
export declare const ProductDocs: {
    operation: Partial<import("@nestjs/swagger/dist/interfaces/open-api-spec.interface").OperationObject>;
    response: import("@nestjs/swagger").ApiResponseSchemaHost;
    queries: ApiQueryOptions[];
    tag: string;
};
