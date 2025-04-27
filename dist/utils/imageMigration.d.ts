import { ConfigService } from '@nestjs/config';
export declare const imageUrlBuilder: (config: ConfigService) => (path: string) => string;
export declare function extractImagePath(supabaseUrl: string): string | null;
