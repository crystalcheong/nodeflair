import { AppBaseUrl, AppDescription } from '@/data/static/app'
import { SEO as SEOData } from '@/data/static/seo'
import { Helmet, HelmetProps } from 'react-helmet-async'

export type SEO = HelmetProps
export const SEO = (props: SEO) => {
  return (
    <Helmet
      defaultTitle={SEOData.name}
      titleTemplate={`%s | ${SEOData.name}`}
      {...props}
    >
      <html lang="en" />
      <meta charSet="utf-8" />

      <base
        target="_blank"
        href={AppBaseUrl()}
      />

      <meta
        name="description"
        content={AppDescription}
      />

      <link
        rel="icon"
        type="image/svg+xml"
        href="/logo.svg"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
    </Helmet>
  )
}
