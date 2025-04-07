export const getSupabaseImageUrl = (path: string): string => {
  const baseUrl = process.env.SUPABASE_PROJECT_URL;
  const bucket = process.env.BUCKET;

  if (!baseUrl || !bucket) {
    throw new Error('Missing SUPABASE_PROJECT_URL or BUCKET in environment variables.');
  }
  return `${baseUrl}/storage/v1/object/public/${bucket}/${path}`;
};
