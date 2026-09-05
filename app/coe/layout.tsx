import { constructMetadata, PAGE_SEO } from '@/app/seo';

export const metadata = constructMetadata(PAGE_SEO.coe);

export default function CoeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
