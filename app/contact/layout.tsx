import { constructMetadata, PAGE_SEO } from '@/app/seo';

export const metadata = constructMetadata(PAGE_SEO.contact);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
