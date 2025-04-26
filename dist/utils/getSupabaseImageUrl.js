"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupabaseImageUrl = void 0;
const getSupabaseImageUrl = (config) => {
    return (path) => {
        const baseUrl = config.get('SUPABASE_PROJECT_URL');
        const bucket = config.get('BUCKET');
        if (!baseUrl || !bucket) {
            throw new Error('Missing SUPABASE_PROJECT_URL or BUCKET in environment variables.');
        }
        return `${baseUrl}/storage/v1/object/public/${bucket}/${path}`;
    };
};
exports.getSupabaseImageUrl = getSupabaseImageUrl;
//# sourceMappingURL=getSupabaseImageUrl.js.map