import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Century by Stacklevel Group — корпоративный контур внедрения ИИ',
  description:
    'Century — корпоративная платформа и конвейер для контролируемого внедрения LLM\u2011сервисов в крупных организациях: внутри периметра (on\u2011prem/air\u2011gapped), ИБ и комплаенс, верификация ответов (RAG + цитаты), логирование и аудит, KPI и дорожная карта масштабирования.',
  metadataBase: new URL('https://century-ai.ru'),
  openGraph: {
    title: 'Century by Stacklevel Group — корпоративный контур внедрения ИИ',
    description:
      'Century — корпоративная платформа для контролируемого внедрения LLM\u2011сервисов в крупных организациях.',
    url: 'https://century-ai.ru',
    siteName: 'Century',
    locale: 'ru_RU',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://century-ai.ru/#website',
      name: 'Century by Stacklevel Group — корпоративный контур внедрения ИИ',
      url: 'https://century-ai.ru/',
      description:
        'Century — корпоративная платформа и конвейер для контролируемого внедрения LLM\u2011сервисов в крупных организациях.',
      inLanguage: 'ru-RU',
    },
    {
      '@type': 'Organization',
      '@id': 'https://stacklevel.group/#organization',
      name: 'StackLevel Group',
      url: 'https://stacklevel.group',
      description:
        'StackLevel Group — компания, разрабатывающая корпоративные LLM/RAG-системы с фокусом на безопасность и надежность.',
      sameAs: ['https://www.linkedin.com/company/stacklevel'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Минск',
        addressCountry: 'BY',
      },
    },
    {
      '@type': 'Organization',
      name: 'Проект Century',
      url: 'https://century-ai.ru',
      description:
        'Century — платформа для безопасного внедрения LLM в контур бизнеса и государственных организаций.',
      sameAs: ['https://destiny.by'],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${manrope.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="grid-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}

