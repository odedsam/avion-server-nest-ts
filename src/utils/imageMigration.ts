import { ConfigService } from '@nestjs/config';

export const imageUrlBuilder = (config: ConfigService) => {
  return (path: string): string => {
    const baseUrl = config.get<string>('SUPABASE_PROJECT_URL');
    const bucket = config.get<string>('BUCKET');

    if (!baseUrl || !bucket) {
      throw new Error('Missing SUPABASE_PROJECT_URL or BUCKET in environment variables.');
    }

    return `${baseUrl}/storage/v1/object/public/${bucket}/${path}`;
  };
};


export function extractImagePath(supabaseUrl: string): string | null {
  const match = supabaseUrl.match(/public\/(.+)/);
  if (match && match[1]) {
    return `/${match[1]}`;
  }
  return null;
}
// https://res.cloudinary.com/drs8tf2ml/image/upload/Chairs/chairEight_gyn3of.webp

