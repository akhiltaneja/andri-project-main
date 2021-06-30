import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'https://app.tokencharts.io/',
    disable: false,
  },
  // {
  //   label: 'Trade',
  //   icon: 'TradeIcon',
  //   disable: false,
  //   items: [
  // {
  //   label: 'Swap',
  //   icon: 'TradeIcon',
  //   href: '/swap',
  //   disable: false,
  // },
  // {
  //   label: 'Pool',
  //   icon: 'TradeIcon',
  //   href: '/pool',
  //   disable: false,
  // },
  {
    label: 'Chart',
    icon: 'TradeIcon',
    href: '/chart',
    disable: false,
  },
  {
    label: 'Telegram',
    icon: 'TelegramIcon',
    href: '/telegram',
    disable: false,
  },
  {
    label: 'Blog',
    icon: 'BlogIcon',
    href: '/blog',
    disable: false,
  },
  // {
  //   label: 'Checker',
  //   icon: 'TradeIcon',
  //   href: '/rug',
  //   disable: false,
  // },
  //     {
  //       label: 'Cross-chain Bridge',
  //       href: '/#',
  //       disable: true,
  //     },
  //   ],
  // },
  // {
  //   label: 'About WindSwap',
  //   icon: 'InfoIcon',
  //   disable: false,
  //   items: [
  //     {
  //       label: 'Home',
  //       href: 'https://windswap.finance',
  //       disable: false,
  //     },
  //     {
  //       label: 'Audit by Techrate',
  //       href:
  //         'https://github.com/TechRate/Smart-Contract-Audits/blob/main/WindSwap%20Full%20Smart%20Contract%20Security%20Audit.pdf',
  //       disable: false,
  //     },
  //     {
  //       label: 'Litepaper',
  //       href: 'https://windswap.finance/whitepaper/litepaper.pdf',
  //       disable: false,
  //     },
  //   ],
  // },
  // {
  //   label: 'Chart Tools',
  //   icon: 'IfoIcon',
  //   href: '/chart',
  //   disable: false,
  // },
  // {
  //   label: 'Rug Check',
  //   icon: 'MoreIcon',
  //   href: '/#',
  //   disable: true,
  // },
]

export default config
