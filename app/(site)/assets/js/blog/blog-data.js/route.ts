import { blogDataModule } from '@/lib/blog';

// The blog scripts import this module; written to out/assets/js/blog/blog-data.js at build time
export const dynamic = 'force-static';

export async function GET() {
    return new Response(await blogDataModule(), {
        headers: { 'Content-Type': 'text/javascript; charset=utf-8' },
    });
}
