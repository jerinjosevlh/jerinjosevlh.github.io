import { listPages, Page, pageMetadata } from '@/lib/page';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

// Pages are generated into content/pages/blog by build/build-blog.js
export function generateStaticParams() {
    return listPages('blog');
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    return pageMetadata(`blog/${slug}`);
}

export default async function Route({ params }: Props) {
    const { slug } = await params;
    return <Page name={`blog/${slug}`} />;
}
