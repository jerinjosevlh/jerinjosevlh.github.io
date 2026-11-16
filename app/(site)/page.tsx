import { Page, pageMetadata } from '@/lib/page';

export const metadata = pageMetadata('index');

export default function Route() {
    return <Page name="index" />;
}
