import { Helmet } from "react-helmet-async";
interface SEOProps { title: string; description?: string; }
export function SEO({ title, description }: SEOProps) {
  return (
    <Helmet>
      <title>{title} | MediCycle Admin</title>
      <meta name='description' content={description || 'MediCycle Admin Console'} />
    </Helmet>
  );
}
