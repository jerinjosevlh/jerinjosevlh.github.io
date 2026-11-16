import { Page, pageMetadata } from '@/lib/page';

export const metadata = pageMetadata('blog');

export default function Route() {
    return <Page name="blog" />;
}
