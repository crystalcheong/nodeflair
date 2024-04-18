import { BoundaryProvider } from '@/components/Core/providers/Provider.Boundary'
import { Separator } from '@/components/Core/ui/Separator'
import { Toaster } from '@/components/Core/ui/Sonner'
import { SEO as SEOProvider } from '@/components/Layout/SEO'

import { Logo } from '@/components/Layout/Logo'
import { Navbar } from '@/components/Layout/Navbar'
import { SEO } from '@/data/static/seo'

import { cn } from '@/utils/dom'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import { Outlet } from 'react-router-dom'

const AppLayout = ({ seo }: { seo?: SEO }) => {
  return (
    <BoundaryProvider>
      <SEOProvider {...seo} />
      <Toaster />

      <Navbar />

      <Outlet />

      <Footer />
    </BoundaryProvider>
  )
}

export default AppLayout

const Footer = () => {
  return (
    <footer
      className={cn(
        'border-t pb-2 pt-4',

        'bg-gradient-to-br from-background to-muted',
      )}
    >
      <main className={cn('container max-sm:px-4', 'flex flex-col gap-4')}>
        <div className="flex w-full flex-row flex-wrap place-content-between place-items-center gap-x-2 gap-y-1">
          <Logo iconProps={{ showFull: true }} />
          <span className="small truncate text-pretty text-start text-xs font-normal leading-tight text-muted-foreground">
            Empowering tech talents to make better career decisions
          </span>
        </div>

        <Separator />

        <aside className="flex w-full flex-row flex-wrap place-content-between place-items-center gap-x-2 gap-y-1">
          <p className="small truncate text-pretty text-start text-xs font-normal leading-tight text-muted-foreground">
            Built with <HeartFilledIcon className="inline-block" /> for
            developers, by developers
          </p>

          <div className="flex flex-row place-content-center place-items-center gap-4 text-muted-foreground">
            {Object.values(SEO.socials).map((social) => (
              <a
                href={social.href}
                target="_blank"
              >
                <social.icon className="size-4 cursor-pointer hover:text-primary" />
              </a>
            ))}
          </div>

          <p className="small truncate text-pretty text-start text-xs font-normal leading-tight text-muted-foreground">
            <span>
              &copy;&nbsp;{SEO.name}&nbsp;{new Date().getFullYear()}{' '}
            </span>
            <span>All rights reserved</span>
          </p>
        </aside>
      </main>
    </footer>
  )
}
