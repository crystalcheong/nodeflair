import { LinkedInLogoIcon } from '@radix-ui/react-icons'
import { PiTiktokLogo } from 'react-icons/pi'
import { SiTelegram } from 'react-icons/si'

export class SEO {
  static name = 'NodeFlair (Clone)'
  static domain = 'nodeflair.com'
  static url = `https://${SEO.domain}`

  static socials = {
    Telegram: {
      href: 'https://t.me/nodeflairsg',
      icon: SiTelegram,
    },
    LinkedIn: {
      href: 'https://www.linkedin.com/company/nodeflair',
      icon: LinkedInLogoIcon,
    },
    TikTok: {
      href: 'https://www.tiktok.com/@nodeflair',
      icon: PiTiktokLogo,
    },
  }
}
