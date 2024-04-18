import { BoundaryProvider } from '@/components/Core/providers/Provider.Boundary'
import { Toaster } from '@/components/Core/ui/Sonner'
import { SEO as SEOProvider } from '@/components/Layout/SEO'

import { Navbar } from '@/components/Layout/Navbar'
import { SEO } from '@/data/static/seo'

import { Footer } from '@/components/Layout/Footer'
import { Outlet } from 'react-router-dom'

const AppLayout = ({ seo }: { seo?: SEO }) => {
  return (
    <BoundaryProvider>
      <SEOProvider {...seo} />
      <Toaster />

      <AppLayout.Navbar />

      <Outlet />

      <AppLayout.Footer />
    </BoundaryProvider>
  )
}

AppLayout.Navbar = Navbar
AppLayout.Footer = Footer
export default AppLayout
