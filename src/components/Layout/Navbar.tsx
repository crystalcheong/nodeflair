import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/Core/ui/Avatar'
import { Button } from '@/components/Core/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Core/ui/Dialog'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/Core/ui/Navigation'
import { Logo } from '@/components/Layout/Logo'
import { ThemeButton } from '@/components/Layout/Theme.Button'
import { SEO } from '@/data/static/seo'
import { cn } from '@/utils/dom'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'

export const Navbar = () => {
  return (
    <nav
      className={cn(
        'transition-all',
        'sticky inset-x-0 top-0 z-40',
        'pt-3',
        'border-b-2 border-b-primary bg-background/80 backdrop-blur',
      )}
    >
      <main
        className={cn(
          'container max-sm:px-4',
          'flex flex-row place-content-between place-items-center gap-4',
          'pb-3',
        )}
      >
        <Navbar.Logo />

        <div className="flex flex-1 flex-row place-content-end gap-2">
          <Navbar.Theme />
          <Navbar.About />
        </div>
      </main>

      <aside className="bg-muted">
        <Navbar.Menu />
      </aside>
    </nav>
  )
}

Navbar.Logo = Logo
Navbar.Theme = ThemeButton

const NavbarAbout = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
          <QuestionMarkCircledIcon />
          <span className="sr-only">About</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col flex-wrap overflow-hidden sm:max-w-md">
        <DialogHeader className="w-full text-pretty">
          <DialogTitle className="max-w-full truncate text-pretty">
            About
          </DialogTitle>
          <DialogDescription className="max-w-prose text-pretty text-start">
            This demo is completed as part of NodeFlair's Software Engineering
            Intern assessment.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-row flex-wrap place-items-center gap-2">
          <span className="small">Reference:</span>
          <Button
            variant={'link'}
            className="h-auto p-0"
          >
            <a
              href={`${SEO.url}/interviews`}
              target="_blank"
            >
              nodeflair.com/interviews
            </a>
          </Button>
        </div>

        <DialogFooter className="flex flex-row flex-wrap place-items-center gap-2 sm:justify-start">
          <span className="small">Done by: </span>
          <Button
            variant={'link'}
            className="h-auto p-0"
          >
            <Avatar className="mr-2">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/65748007?v=4"
                alt="@crystalcheong"
              />
              <AvatarFallback>CC</AvatarFallback>
            </Avatar>
            <a
              href={`https://github.com/crystalcheong`}
              target="_blank"
            >
              Crystal Cheong
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

Navbar.About = NavbarAbout

//#region  //*=========== MENU ===========

type NavRoute = {
  label: string
  href: string
  tag?: string
  description?: string
}
export const NavbarMenu = () => {
  const Routes: (NavRoute & {
    subRoutes?: NavRoute[]
  })[] = [
    {
      label: 'Companies',
      href: `${SEO.url}/companies?countries%5B%5D=Singapore`,
    },
    {
      label: 'Jobs',
      href: `${SEO.url}/jobs?countries%5B%5D=Singapore`,
    },
    {
      label: 'Interviews',
      href: `${SEO.url}/interviews`,
      // href: `/interviews`,
      tag: 'actual',
    },
    {
      label: 'Salaries',
      href: `${SEO.url}/salaries?countries%5B%5D=Singapore`,
    },
    {
      label: 'Reviews',
      href: `${SEO.url}/reviews`,
    },
    {
      label: 'Blog',
      href: `${SEO.url}/blog`,
    },
    {
      label: 'Tools',
      href: ``,
      tag: 'new',
      subRoutes: [
        {
          label: 'Resume Builder',
          href: `${SEO.url}/resumes`,
          description:
            'Become Top 10% Applicants With Our Free Resume Builder! 🎯',
        },
        {
          label: 'Resume Checker',
          href: `${SEO.url}/resume-checker`,
          description: 'Land More Interviews With Our FREE Resume Checker',
        },
        {
          label: 'AI Interview Prep',
          href: `${SEO.url}/interview-preparation`,
          tag: 'new',
          description:
            'Step Up Your Interview Preparation With AI Interview Generator',
        },
        {
          label: 'One-Click Job Apply',
          href: `${SEO.url}/one-click-job-apply`,
          tag: 'new',
          description:
            'Speed Up Your Job Hunt with Our One-Click Job Apply Extension',
        },
        {
          label: 'Check All Tools',
          href: `${SEO.url}/essential-tools-for-job-seekers`,
          tag: 'new',
          description:
            'At NodeFlair, we provide an essential toolkit specifically designed to enhance all important stages in your job search journey. Check out our top recommendations for getting the most out of us!',
        },
      ],
    },
  ]
  return (
    <NavigationMenu className="container hidden max-sm:px-4 lg:block">
      <NavigationMenuList className="m-0 place-content-start p-0">
        {Routes.map((route, idx) => {
          const isTrigger = !route.href || !!(route.subRoutes ?? []).length

          return (
            <NavigationMenuItem
              key={`route-${idx}`}
              className="!mt-0 mr-2"
            >
              {!isTrigger && (
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'flex place-items-center gap-1 capitalize',
                  )}
                  href={route.href}
                  target="_blank"
                >
                  <span>{route.label}</span>
                  {route?.tag && (
                    <span className="rounded bg-primary px-1 text-[0.5rem] font-bold uppercase text-background">
                      {route.tag}
                    </span>
                  )}
                </NavigationMenuLink>
              )}

              {isTrigger && (
                <>
                  <NavigationMenuTrigger className="flex place-items-center gap-1 capitalize">
                    <span>{route.label}</span>

                    {route?.tag && (
                      <span className="rounded bg-primary px-1 text-[0.5rem] font-bold uppercase text-background">
                        {route.tag}
                      </span>
                    )}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {(route.subRoutes ?? []).map((subRoute, i) => (
                        <li key={`route-${idx}-subroute-${i}`}>
                          <NavigationMenuLink asChild>
                            <a
                              href={subRoute.href}
                              target="_blank"
                              className={cn(
                                'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                              )}
                            >
                              <div className="flex place-items-center gap-1 text-sm font-medium capitalize leading-none">
                                <span>{subRoute.label}</span>

                                {subRoute?.tag && (
                                  <span className="rounded bg-primary p-1 text-[0.5rem] font-bold uppercase text-background">
                                    {subRoute.tag}
                                  </span>
                                )}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {subRoute?.description ?? ''}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
Navbar.Menu = NavbarMenu

//#endregion  //*======== MENU ===========
