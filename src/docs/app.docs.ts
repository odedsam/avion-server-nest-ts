import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

export const getStatusOperation: ApiOperationOptions = {
  summary: 'Get Application Status',
  description: 'This Endpoint returns the current state of the Application.',
};

export const getStatusResponse: ApiResponseOptions = {
  status: 200,
  description: 'This Application is running and returns a status message.',
  schema: {
    example: { status: 'Running' },
  },
};
