import { listPages, Page, pageMetadata } from '@/lib/page';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return listPages('work');
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    return pageMetadata(`work/${slug}`);
}

export default async function Route({ params }: Props) {
    const { slug } = await params;
    return <Page name={`work/${slug}`} />;
}
