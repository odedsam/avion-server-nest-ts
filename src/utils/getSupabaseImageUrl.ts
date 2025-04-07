import { ConfigService } from '@nestjs/config';

export const getSupabaseImageUrl = (config: ConfigService) => {
  return (path: string): string => {
    const baseUrl = config.get<string>('SUPABASE_PROJECT_URL');
    const bucket = config.get<string>('BUCKET');

    if (!baseUrl || !bucket) {
      throw new Error('Missing SUPABASE_PROJECT_URL or BUCKET in environment variables.');
    }

    return `${baseUrl}/storage/v1/object/public/${bucket}/${path}`;
  };
};
