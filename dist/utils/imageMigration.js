"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUrlBuilder = void 0;
exports.extractImagePath = extractImagePath;
const imageUrlBuilder = (config) => {
    return (path) => {
        const baseUrl = config.get('SUPABASE_PROJECT_URL');
        const bucket = config.get('BUCKET');
        if (!baseUrl || !bucket) {
            throw new Error('Missing SUPABASE_PROJECT_URL or BUCKET in environment variables.');
        }
        return `${baseUrl}/storage/v1/object/public/${bucket}/${path}`;
    };
};
exports.imageUrlBuilder = imageUrlBuilder;
function extractImagePath(supabaseUrl) {
    const match = supabaseUrl.match(/public\/(.+)/);
    if (match && match[1]) {
        return `/${match[1]}`;
    }
    return null;
}
//# sourceMappingURL=imageMigration.js.map