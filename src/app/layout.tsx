import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
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
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://century-ai.ru/#website",
      "name": "Century by Stacklevel Group — корпоративный контур внедрения ИИ",
      "url": "https://century-ai.ru/",
      "description": "Century — корпоративная платформа и конвейер для контролируемого внедрения LLM‑сервисов в крупных организациях: внутри периметра (on‑prem/air‑gapped), ИБ и комплаенс, верификация ответов (RAG + цитаты), логирование и аудит, KPI и дорожная карта масштабирования.",
      "inLanguage": "ru-RU"
    },
    {
      "@type": "Organization",
      "@id": "https://stacklevel.group/#organization",
      "name": "StackLevel Group",
      "url": "https://stacklevel.group",
      "description": "StackLevel Group — компания, разрабатывающая корпоративные LLM/RAG-системы с фокусом на безопасность и надежность.",
      "sameAs": [
        "https://www.linkedin.com/company/stacklevel"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Минск",
        "addressCountry": "BY"
      }
    },
    {
      "@type": "Organization",
      "name": "Проект Century",
      "url": "https://century-ai.ru",
      "description": "Century — платформа для безопасного внедрения LLM в контур бизнеса и государственных организаций: локально (air-gapped/on-prem) с совместимостью с облачными моделями и единым конвейером для запуска LLM-приложений.",
      "sameAs": [
        "https://destiny.by"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://vadimohka.ru/#person",
      "name": "Владымцев Вадим Денисович",
      "alternateName": "Vadim Vladymtsev",
      "disambiguatingDescription": "Архитектор корпоративных LLM/RAG-систем (secure on-prem / air-gapped).",
      "description": "Архитектор корпоративных LLM/RAG-систем. Специализируюсь на безопасном внедрении ИИ в регулируемых секторах: air-gapped/on-prem развертывание, OpenAI-совместимый API, гибридный поиск, верификация источников, аудит и наблюдаемость.",
      "jobTitle": "R&D Director & AI Solutions Architect",
      "worksFor": { "@id": "https://stacklevel.group/#organization" },
      "url": "https://vadimohka.ru/",
      "image": "https://vadimohka.ru/Vadim_Vladymtsev.png",
      "mainEntityOfPage": { "@id": "https://vadimohka.ru/#profile" },
      "sameAs": [
        "https://www.linkedin.com/in/vadimohka/",
        "https://github.com/vadimohka",
        "https://scholar.google.com/citations?user=ccabRDYAAAAJ",
        "https://codeforces.com/profile/Vadimohka",
        "https://www.researchgate.net/profile/Vadim-Vladymtsev",
        "https://libeldoc.bsuir.by/simple-search?query=Владымцев",
        "https://stepik.org/users/296085237/profile",
        "https://setka.ru/users/9c9dcca0-084b-4bf3-addf-1102cf4e4fd2",
        "https://ctv.by/tags/vadim-vladymcev"
      ],
      "email": "vadimohkav@gmail.com",
      "identifier": [
        {
          "@type": "PropertyValue",
          "propertyID": "Google Scholar",
          "value": "ccabRDYAAAAJ",
          "url": "https://scholar.google.com/citations?user=ccabRDYAAAAJ"
        }
      ],
      "knowsAbout": [
        "Enterprise RAG",
        "Hybrid Search",
        "Source-grounded answers",
        "Air-Gapped Systems",
        "On-Premise Deployments",
        "OpenAI-compatible API",
        "LLM Security",
        "Prompt Injection Defense",
        "Access Control",
        "Audit Logging",
        "LLM Evaluation",
        "AI Observability",
        "Agentic Orchestration",
        "AI Readiness Assessment"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "БГУИР"
      },
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Master's degree",
        "educationalLevel": "Master's degree",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "БГУИР"
        }
      }
    },
    {
      "@type": "Person",
      "name": "Бахмат Виталий Кириллович",
      "alternateName": "Vitali Bakhmat",
      "jobTitle": "CEO продукта",
      "worksFor": { "@id": "https://stacklevel.group/#organization" },
      "sameAs": [
        "https://www.facebook.com/vbakhmat",
        "https://www.linkedin.com/in/vbakhmat/"
      ],
      "description": "Partner at StackLevel Group, Account Manager at LSEG (London Stock Exchange Group), Business Development Manager at JungleJobs"
      }
    ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="google-site-verification" content="G-9lIFOuqI7bxNAuFqZww-U_npp1rvShARY-mU1dBVs" />
      </head>
      <body>
        <div className="grid-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}

