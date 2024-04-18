import { useMediaQuery } from '@/components/Core/hooks/use-media-query'
import { Badge } from '@/components/Core/ui/Badge'
import { AppName } from '@/data/static/app'
import { env } from '@/env'
import { useNavigate } from '@/router'
import { cn } from '@/utils/dom'
import { Link } from 'react-router-dom'

type LogoIcon = {
  showFull?: boolean
}
export const LogoIcon = ({ showFull }: LogoIcon) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const src = showFull ?? isDesktop ? '/images/nodeflair.svg' : 'logo.svg'
  return (
    <Link
      to={'/'}
      unstable_viewTransition
    >
      <img
        src={src}
        alt={AppName}
        className="dark:invert"
      />
    </Link>
  )
}

type Logo = {
  iconProps?: LogoIcon
}
export const Logo = ({ iconProps }: Logo) => {
  const navigate = useNavigate()

  return (
    <div
      className={cn('flex flex-row place-items-center gap-1', 'cursor-pointer')}
      onClick={() => {
        navigate(`/`, {
          unstable_viewTransition: true,
        })
      }}
    >
      <Logo.Icon {...iconProps} />

      {env.VITE_BETA_FLAG && (
        <Badge className="-translate-y-2/4 px-1 text-[0.5rem] uppercase">
          clone
        </Badge>
      )}
    </div>
  )
}
Logo.Icon = LogoIcon
