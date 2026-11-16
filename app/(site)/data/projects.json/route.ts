import { getProjects } from '@/lib/content';

// Written to out/data/projects.json at build time
export const dynamic = 'force-static';

export async function GET() {
    return Response.json({ projects: getProjects() });
}
