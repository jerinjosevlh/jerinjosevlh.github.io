import { getAboutCards } from '@/lib/content';

// Written to out/data/about-carousel.json at build time
export const dynamic = 'force-static';

export async function GET() {
    return Response.json({ carouselCards: await getAboutCards() });
}
