import { constructMetadata, PAGE_SEO } from '@/app/seo';

export const metadata = constructMetadata(PAGE_SEO.careers);

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
