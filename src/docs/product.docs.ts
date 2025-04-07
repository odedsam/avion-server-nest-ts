import {
  ApiOperationOptions,
  ApiQueryOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';

export const getProductOperationStatus: ApiOperationOptions = {
  summary: 'Get All Products',
  description:'Send All Products by offset spliced 0,25 products approximately',
};

export const getProductQueryStatus: ApiQueryOptions = {
  name: 'category',
  required: false,
  type: String,
  description: 'This is How Navigating Products Categories',
};

export const getProductsResponseStatus: ApiResponseOptions = {
  status: 200,
  description: `
  Example Response:
  [
      { "id": 1, "name": "Product A", "category": "Category 1" },
      { "id": 2, "name": "Product B", "category": "Category 1" }
    ],
    "length": 2
`,
  schema: {
    example: [
      { id: 1, name: 'Product A', category: 'Category 1' },
      { id: 2, name: 'Product B', category: 'Category 1' },
      { id: 2, name: 'Product B', category: 'Category 1' },
    ],
  },
};
