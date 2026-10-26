# Century AI EU — Independent Landing Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` to implement this plan sequentially, task by task. Use checkbox steps for tracking. Do not start parallel agents unless the user explicitly requests them. This document contains both the final specification and the implementation plan; no previous chat is required.

**Goal:** Превратить текущий проект в самостоятельный англоязычный B2B-лендинг `https://century-ai.eu`, используя только сильные маркетинговые идеи референса и направляя все обращения к Виталию в Telegram.

**Architecture:** Один статически экспортируемый Next.js App Router лендинг. Восемь содержательных секций, общий header/footer, встроенная информация о приватности и отдельная техническая 404. Без backend, форм, трекеров, мультиязычности, каталога страниц и зависимости от других сайтов Century.

**Tech Stack:** Сохранить установленную ветку Next.js 15, React 19, TypeScript, обычный CSS и Manrope. Для небольшого набора браузерных проверок добавить только `@playwright/test` в devDependencies. Не менять major-версии стека и не добавлять UI framework/CMS.

**Spec:** Разделы A–F этого документа — окончательная спецификация. Раздел G — последовательность реализации. Раздел H — приёмка. При конфликте со старыми текстами, комментариями или предыдущим планом этот документ имеет приоритет.

**Date:** 2026-10-26. **Target repository:** `/Users/vadimohka/WORK/century-ai-next`. Исходное состояние при подготовке: commit `00fd4fc`, продуктовые файлы не изменялись.

## Global Constraints

- Основной и единственный production origin: `https://century-ai.eu`, без `www`, без подпапки репозитория.
- Единственный канал обращения: `https://t.me/vitalibakhmat`. Имя контакта: `Vitali Bakhmat`.
- Весь публичный текст — английский: видимые надписи, metadata, JSON-LD, alt, aria-label, title, 404 и раскрываемые блоки.
- `html lang="en"`. Переключателя языков, `/en/`, `/ru/`, локализованных копий и определения языка браузера нет.
- Нет связей сайта с `century-ai.by` и `century-ai.ru`: ссылок, canonical/hreflang, редиректов, sameAs, remote assets, импортов, API-запросов, общей аналитики или токенов проверки владения.
- `hoster.by` отсутствует: название, логотип, партнёрский блок, изображения, alt и структурированные данные.
- Из референса переносятся только идеи хуков. Не копировать его компоненты, CSS, готовую разметку или внешние зависимости. Исключение по последующему запросу пользователя: три локальных портрета фаундеров и команды; они хранятся в public/founders и не загружаются с другого сайта.
- Нет форм, полей ввода, календарей, чат-виджетов, ботов, отправки сообщений, CRM, email, телефонных ссылок, QR-кодов и дополнительных социальных контактов.
- Контактные ссылки ведут только на точный `TELEGRAM_URL`. Дополнительно разрешены ссылки на `https://vadimohka.com/` и `https://www.linkedin.com/in/ekrychev/` в компактном блоке фаундеров и команды по последующим запросам пользователя. Навигация внутри страницы и ссылка `/` не являются контактными каналами.
- Нет аналитики, пикселей, сторонних embed, cookies/localStorage от кода приложения и popup согласия на трекинг. Не переносить Яндекс Метрику, Google Analytics или старый verification token.
- Не придумывать отзывы, клиентов, проценты экономии, сроки внедрения, SLA, цены, сертификаты, EU-офис, EU-юрлицо или факт хранения данных в ЕС.
- Это план изменения сайта, а не реализации AI-платформы. Демонстрация ниже статическая и явно помечена как пример.
- В этой работе не публиковать сайт, не менять DNS/регистратора, настройки существующих сайтов и Git remote, не отправлять сообщения Виталию. Подготовить независимый артефакт для отдельного EU-размещения.

## Review Focus

1. Production-сборка открывается от корня `.eu`, а ресурсы не запрашиваются с `/century-ai-next/` — проверка G8.
2. В опубликованной сборке нет скрытых старых связей: JS, metadata, JSON-LD, изображения и footer — проверки G7–G8.
3. Без JavaScript пользователь видит оффер, сценарии, источники примера и ссылку Telegram — проверка G8.
4. На экране 390 px меню, карточки и CTA не обрезаются, нет горизонтальной прокрутки — проверка G8.
5. Клик по Telegram не маскируется под отправленную заявку или забронированное демо; сайт ничего не отправляет автоматически — проверки G2 и G8.

---

## A. Что именно строим

### A1. Решения пользователя

1. Удалить hoster.by.
2. Отказаться от формы: оставить только Telegram Виталия.
3. Полностью английский сайт с SEO для B2B по всему ЕС.
4. Использовать домен `century-ai.eu`.
5. Сделать независимый лендинг. Сайты `.by` и `.ru` не являются его языковыми версиями, источниками загружаемого контента или частью общего сайта.

### A2. Маркетинговое предложение

Главный тезис: **Enterprise AI. Under your control.**

Три входных сценария: **Company knowledge**, **Document workflows**, **Support assistance**. Их подкрепляют ссылки на источники, участие человека, управляемое развёртывание и видимость использования/стоимости. Тезисы о возможностях опираются на предоставленные маркетинговые материалы; они не являются результатом аудита backend-продукта.

Не использовать абстрактный первый экран «Business of tomorrow», каталог из 12 агентов или технические режимы Chat/RPA/Text-to-SQL как главный выбор покупателя. Не добавлять сквозную клиентскую аналитику, прогноз оттока и скоринг: они не входят в первый выпуск.

### A3. Единственная воронка

`Hero → relevant use case → illustrative example / controls → Telegram`

Основная подпись CTA: `Message Vitali on Telegram`.
Короткая подпись только в header: `Talk to Vitali`.
Обе ведут на один и тот же `https://t.me/vitalibakhmat` без query-параметров, предзаполненных сообщений, redirect endpoint и сокращателей.

Не использовать `Book a demo`, `Submit`, `Request a callback`, `Contact sales`: они создают ожидание формы или бронирования.

### A4. Граница объёма

Есть только `/`, `/404.html` и технические файлы SEO. Нет страниц `/use-cases/`, `/security/`, `/pricing/`, `/demo/`, `/privacy/` или блога. Эти темы раскрываются секциями одной страницы. Не создавать «SEO-страницы» для стран ЕС с дублирующими текстами.

## B. Точная структура и готовый английский контент

Все строки ниже — финальный текст для реализации. Не переводить обратно, не усиливать обещания и не дописывать общие AI-слоганы. Разрешено только менять переносы строк без изменения смысла. Английская орфография: British English, например `organisations`.

### B1. Header

- Текстовый логотип: `Century`, ссылка `/`.
- Навигация: `Use cases` → `/#use-cases`; `Platform` → `/#platform`; `Security` → `/#security`; `How we start` → `/#how-we-start`.
- CTA: `Talk to Vitali` → Telegram.
- Skip link перед header: `Skip to content` → `#main-content`.
- Не показывать Stacklevel-логотип, подпись «by Stacklevel Group», телефон, email и другие соцсети. Это решение об оформлении самостоятельного лендинга, а не заявление о создании нового юридического лица.
- Header не скрывается при прокрутке. На мобильном навигация переносится на дополнительную строку; не создавать hamburger, modal или отдельную JS-логику меню.

### B2. Hero — `id="home"`

- Eyebrow: `Enterprise AI for European businesses`
- Единственный H1: `Enterprise AI. Under your control.`
- Lead: `Help your teams find answers, process documents and resolve routine requests — with source references, access controls and human review.`
- Support: `Start with one workflow. Measure the outcome. Expand from there.`
- Primary CTA: `Message Vitali on Telegram` → Telegram.
- Secondary CTA: `Explore use cases` → `/#use-cases`.
- Три коротких сигнала: `Source-linked answers`; `Human review`; `Deployment options`.
- Справа — лёгкая HTML/CSS-композиция из трёх карточек: `Ask` / `Find answers in approved knowledge`; `Review` / `Check sources and proposed actions`; `Act` / `Move work forward with human oversight`.
- Над композицией подпись `Example workflow`. Не изображать её как скриншот реального customer dashboard.

### B3. Use cases — `id="use-cases"`

H2: `Start with the work that slows your team down.`
Intro: `Choose a focused use case with clear inputs, an accountable owner and an outcome you can measure.`

Три карточки всегда видимы, без tabs/carousel. Не добавлять проценты рядом с метриками.

| Поле | Company knowledge | Document workflows | Support assistance |
|---|---|---|---|
| Hook / H3 | Find the answer. Check the source. | Move documents forward with human review. | Resolve routine requests. Escalate with context. |
| Body | Help employees find answers across approved policies, procedures and internal documents, with references they can check. | Extract information, compare it with defined rules and prepare the next step for a reviewer before an action is taken. | Help support teams answer recurring questions from approved knowledge and pass exceptions to a person with the relevant context. |
| Audience | For operations, HR and internal service teams. | For operations, procurement and document-heavy teams. | For internal service desks and customer support teams. |
| Flow | Question → approved sources → referenced answer | Document → extraction → review → next step | Request → suggested answer → human handover |
| Measure | Time to find an answer; answer usefulness; source coverage. | Processing time; correction rate; review effort. | Resolution time; repeat requests; handover quality. |

Над последней строкой каждой карточки: `What to measure`. Это показатели будущей оценки, не доказанные результаты клиентов.
Под сеткой один CTA: `Message Vitali on Telegram`.

### B4. Source example — `id="example"`

H2: `An answer you can inspect.`
Intro: `See how a source-linked answer can help a team check the information before acting on it.`
Постоянный заметный badge: `Illustrative example — sample data`.

Question: `What must be checked before approving a new supplier?`

Answer: `Confirm that the required documents are complete [1]. Route exceptions to the procurement owner before approval [2].`

Два источника в нативных `<details>`:

| Key | Summary | Location | Excerpt |
|---|---|---|---|
| `supplier-checklist` | `[1] Supplier onboarding checklist` | `Section 2 — Required documents` | `Before a supplier is approved, the procurement team checks that the required onboarding documents are complete.` |
| `approval-policy` | `[2] Procurement approval policy` | `Section 4 — Exceptions` | `Exceptions to the standard onboarding requirements must be reviewed by the procurement owner before approval.` |

Использовать ID `source-supplier-checklist` и `source-approval-policy` на соответствующих `<details>`. `[1]` и `[2]` в ответе — обычные якорные ссылки на эти ID; затем пользователь раскрывает источник через `<summary>`. Не обещать автопоиск, live chat, загрузку документов или автоматическое раскрытие по ссылке.

Под примером: `This example shows the interaction pattern. It is not a customer result or a live AI response.`
Старую демонстрационную цифру 63%, отчёты Q3 и заявления о фактической индексации удалить.

### B5. Platform — `id="platform"`

H2: `One platform for knowledge, workflows and oversight.`
Intro: `Bring focused AI use cases together with shared access rules, review steps and visibility into usage.`

Четыре статические карточки:

| H3 | Body |
|---|---|
| Assistants | Help teams work with approved knowledge and prepare useful answers. |
| Workflows | Connect document processing, review steps and business actions. |
| Sources and systems | Define the documents, data and integrations each use case needs. |
| Oversight | Review activity, model usage and costs as the use case develops. |

Под карточками: `Integration scope depends on your systems, access requirements and the workflow being implemented.`
Не показывать логотипы SAP, Microsoft, Salesforce и других интеграций как подтверждённые. Не выдавать типы систем ERP/CRM/ITSM за готовые коннекторы.

### B6. Security — `id="security"`

H2: `Decide where AI runs and how it is controlled.`
Intro: `Agree the deployment model, permitted sources and review responsibilities before introducing AI into a business process.`

| H3 | Body |
|---|---|
| Deployment choices | Discuss on-premises or private infrastructure to match the requirements of your environment. |
| Access boundaries | Define which sources a user or workflow is allowed to use. |
| Human oversight | Set review points for exceptions and actions that require approval. |
| Operational visibility | Review activity, outputs and usage to support ongoing evaluation. |

Примечание: `Data location, retention, support access and external services are agreed for each deployment.`

Три FAQ в нативных `<details>`:

- `Can Century work with our existing systems?` → `We scope the required sources and integrations around the first workflow. Available interfaces, access rules and implementation effort are reviewed before the project starts.`
- `Where will our data be processed?` → `The processing location and external dependencies depend on the agreed deployment. These are defined before implementation rather than assumed from the website's domain.`
- `Does the platform automatically make us compliant?` → `No. Compliance depends on your use case, configuration, contracts and operating processes. Technical controls support that work but do not replace it.`

Не размещать GDPR/AI Act/ISO/SOC badges. Не использовать `EU-hosted`, `European company`, `100% secure`, `zero data leakage` или `fully compliant`. География аудитории не доказывает географию компании/обработки.

### B7. Process — `id="how-we-start"`

H2: `Start small. Measure before you scale.`
Intro: `Build the first workflow around a real business need and agreed evaluation criteria.`

Три одновременно видимые карточки, без автоматической ротации:

1. `Choose one workflow` — `Identify the process owner, inputs, current effort and the outcome worth improving.`
2. `Build and evaluate` — `Agree the scope, connect the required sources and assess results against a baseline.`
3. `Decide what comes next` — `Use the evidence to refine the workflow, expand it or stop before a larger rollout.`

Примечание: `Scope, timeline and commercial terms are agreed after the initial discussion.`
Не указывать универсальные 30/60/90 дней, фиксированные месяцы, бесплатный пилот или гарантированный ROI.

### B8. Contact — `id="contact"`

H2: `Let's find your first AI workflow.`
Body: `Tell Vitali which process you want to improve, where the relevant information lives and what a useful outcome would look like.`
CTA: `Message Vitali on Telegram`.
Под CTA: `You will open a conversation with Vitali Bakhmat on Telegram.`
Не обещать время ответа. Не добавлять «успешно отправлено», поля ввода или сбор контактов на сайте.

### B9. Footer and privacy

- Brand: `Century` — текстовая ссылка `/`.
- Tagline: `Enterprise AI for knowledge, workflows and support.`
- Links: `Use cases` → `/#use-cases`; `Security` → `/#security`; `Privacy` → `/#privacy`; `Back to top` → `/#home`.
- Контакт: `Vitali Bakhmat on Telegram` → Telegram.
- Copyright: `© {build year} Century.`
- Не использовать старые изображения Stacklevel, QR-код или личные профили команды.
- `<details id="privacy">`, summary `Website privacy information`.
- Текст: `This landing page has no contact forms, embedded chat or analytics added by Century. We do not use cookies or local storage in the application code. The hosting provider may process technical request data to deliver and protect the website. If you choose to contact Vitali, you leave this website and use Telegram, where its own terms and privacy practices apply. Please avoid sending confidential business information in an initial message.`
- Не утверждать, что хостинг не ведёт журналы, и не выдавать этот краткий технический текст за юридическую сертификацию. Не выдумывать наименование юрлица, адрес и сроки хранения данных провайдера.

## C. Визуальные и технические решения

- Сохранить характер текущего проекта: белый фон, чёрный текст, акцент `#210dff`, Manrope, широкие поля и ясные карточки. Не переносить дизайн-систему `.by`.
- Header и основные секции белые; Platform — один тёмный контрастный блок; CTA внизу на светлом фоне. Использовать существующие CSS variables.
- Максимальная ширина контента 1280 px. Горизонтальные отступы минимум 20 px на мобильном. Основной текст не меньше 16 px, кликабельная область ссылок-кнопок минимум 44 px по высоте.
- Hero: две колонки на desktop, одна на ширине меньше 900 px. Карточки сценариев/процесса: три колонки от 1000 px, одна ниже. Security/Platform: две колонки от 760 px, одна ниже.
- Отказаться от глобальных `section { min-height: 100vh }`, обязательного scroll snap, перехвата wheel, section dots, авто-ротации, бегущих строк и скрытия текста до IntersectionObserver.
- Использовать обычную прокрутку и `scroll-margin-top` для якорей. В `prefers-reduced-motion: reduce` выключить smooth scroll и декоративные анимации.
- Весь основной контент — Server Components. Не добавлять `'use client'` без конкретной необходимости. Нативные `<details>` работают без JS.
- Удалить старые `useReveal`-вызовы из сохраняемых компонентов и стили, которые делают контент невидимым до гидрации.
- Не нужны модальные окна, drawers, tabs, видеоплеер и видеофон. Из медиаданных допустимы только локальные портреты фаундеров, разрешённые последующим запросом пользователя.
- Шрифт `next/font/google` с `subsets: ['latin']` допустим: Next.js размещает итоговые файлы локально. На загрузке браузер не должен обращаться к Google Fonts или другим внешним сервисам.
- Все public assets должны быть локальными и нужными лендингу. Не оставлять старые логотипы/QR «на всякий случай»: всё из public попадает в экспорт.

### C1. Общий интерфейс контакта

Создать `/Users/vadimohka/WORK/century-ai-next/src/lib/site.ts`:

```ts
export const SITE_NAME = 'Century'
export const SITE_URL = 'https://century-ai.eu'
export const TELEGRAM_URL = 'https://t.me/vitalibakhmat'
export const CONTACT_NAME = 'Vitali Bakhmat'
export const PAGE_TITLE = 'Century | Enterprise AI for European Businesses'
export const PAGE_DESCRIPTION =
  'Find answers, automate document workflows and support your teams with enterprise AI. Explore Century and talk to Vitali on Telegram.'
```

Создать `/Users/vadimohka/WORK/century-ai-next/src/components/TelegramLink.tsx` как Server Component:

```ts
type TelegramLinkProps = {
  children?: React.ReactNode // default: 'Message Vitali on Telegram'
  className?: string
}
export default function TelegramLink(props: TelegramLinkProps): React.JSX.Element
```

Он рендерит обычный `<a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">`. Не использовать onClick, fetch, Telegram SDK, prefetch и `tg://`. Не добавлять персональные/маркетинговые параметры к URL. Все контакты используют этот компонент.

## D. SEO для независимого английского лендинга

### D1. Фиксированные значения

- URL главной и canonical: `https://century-ai.eu/`.
- Title и description брать из C1; одинаковые значения использовать для OG/Twitter, без второго добавления `| Century`.
- `metadataBase: new URL(SITE_URL)`, `alternates.canonical: '/'`.
- Разместить `metadataBase` и шрифт в root layout, а title/description/canonical/OG/Twitter/robots главной и её JSON-LD — в `src/app/page.tsx`. Не задавать canonical главной в root layout: техническая 404 не должна наследовать его.
- `<html lang="en">`; JSON-LD `inLanguage: 'en'`.
- OG `type: 'website'`, `siteName: 'Century'`, `url: SITE_URL + '/'`.
- Не задавать вымышленный OG locale `en_EU`; поле locale в первом выпуске просто опустить.
- Нет `hreflang`: сайт имеет одну английскую версию. Не указывать `en-EU`, `ru-RU`, `ru-BY` и связь с другими доменами.
- Robots: главная `index, follow`. 404 — `noindex, follow`.
- Один видимый H1. Основные секции H2, карточки H3. Для источников `<summary>` — не дополнительные H1.

### D2. Структурированные данные

Заменить старый большой JSON-LD на минимальный `@graph` из `WebSite` и `WebPage`:

- WebSite: `@id = https://century-ai.eu/#website`, `url = https://century-ai.eu/`, `name = Century`, `inLanguage = en`.
- WebPage: `@id = https://century-ai.eu/#webpage`, `url = https://century-ai.eu/`, `name = PAGE_TITLE`, `description = PAGE_DESCRIPTION`, `inLanguage = en`, `isPartOf.@id = https://century-ai.eu/#website`.
- Не добавлять Organization/Person/LocalBusiness, адреса, sameAs, ratings, reviews, offers, SearchAction или выдуманные EU-реквизиты. Сайт не должен изображать новый бренд как отдельное подтверждённое юрлицо.
- Удалить прежний `<meta name="google-site-verification">`; не переиспользовать проверку другого домена.

### D3. Технические файлы

- `/Users/vadimohka/WORK/century-ai-next/src/app/sitemap.ts`: `export const dynamic = 'force-static'`; возвращает ровно один URL `https://century-ai.eu/`. Не добавлять якоря/404/другие домены, не генерировать фиктивный `lastModified` при каждом build.
- `/Users/vadimohka/WORK/century-ai-next/src/app/robots.ts`: `export const dynamic = 'force-static'`; разрешить `/`, указать `https://century-ai.eu/sitemap.xml`.
- `/Users/vadimohka/WORK/century-ai-next/src/app/not-found.tsx`: H1 `Page not found`; текст `The page you are looking for is not available.`; ссылка `Back to Century` → `/`. Английский текст, noindex, без контактной формы.
- `/Users/vadimohka/WORK/century-ai-next/public/og/century-ai-eu.png`: локальный PNG 1200×630, белый фон, синий акцент, строки `Century`, `Enterprise AI. Under your control.`, `Knowledge. Workflows. Support.`, `century-ai.eu`. Никаких партнёрских логотипов.
- OG/Twitter используют абсолютный URL `https://century-ai.eu/og/century-ai-eu.png`, alt `Century — Enterprise AI. Under your control.`. Twitter card `summary_large_image`.
- OG создать один раз браузерным снимком локальной HTML-композиции через Playwright; сохранить PNG в git. Для воспроизводимости добавить `/Users/vadimohka/WORK/century-ai-next/scripts/create-og.mjs`, который не обращается к внешним сайтам и использует системный sans-serif. Не делать OG-зависимостью production build.

### D4. Поисковая направленность

Основной запрос: `enterprise AI platform`. Поддерживающие темы: `enterprise knowledge assistant`, `AI document workflows`, `AI support assistant`, `on-premises AI`.
Это тематические ориентиры для существующего текста, не подтверждённая частотность запросов. Не добавлять скрытые списки ключей, meta keywords, перечисление 27 стран или автоматически созданные локальные страницы.

Домен `.eu` Google рассматривает как generic regional domain, поэтому он сам по себе не гарантирует таргетирование/ранжирование в ЕС. Работу делают содержание, английская индексация, релевантные упоминания и реальные входящие ссылки. Никаких обещаний позиций или обязательного rich result.

## E. Независимость сборки и размещения

- Сохранить `output: 'export'`, `images: { unoptimized: true }`; добавить `trailingSlash: true`.
- Полностью убрать production `basePath` и `assetPrefix` с именем репозитория. Цель — корень отдельного домена, а не GitHub project subpath.
- Корневой `/Users/vadimohka/WORK/century-ai-next/CNAME` содержит только `century-ai.eu` и перевод строки.
- Создать `/Users/vadimohka/WORK/century-ai-next/scripts/postbuild.mjs`: проверить наличие `out/index.html`, скопировать корневой CNAME в `out/CNAME`, создать пустой `out/.nojekyll`. При неверном значении домена или отсутствии index.html завершаться с ненулевым кодом.
- В package.json добавить `postbuild: node scripts/postbuild.mjs` — npm выполнит его после `npm run build`.
- Удалить пакеты `telegram-bot-api` и `gh-pages`, а также scripts `deploy` и `deploy:clean`; обновить lockfile обычным npm, не вручную.
- Не создавать API route, bot-sender, secrets и переменные окружения для формы.
- Текущий workflow `/Users/vadimohka/WORK/century-ai-next/.github/workflows/nextjs.yml` содержит публикацию Pages. Превратить его в **проверку и сборку без публикации**: `contents: read`, Node 20, npm ci, Chromium для проверок, build, typecheck, export check, browser tests, upload обычного artifact `century-ai-eu-static` через `actions/upload-artifact` с включением `.nojekyll`.
- Удалить deploy job, `actions/deploy-pages`, `actions/configure-pages` и `actions/upload-pages-artifact`, `pages: write`, `id-token: write`, а также настройку, которая автоматически инжектирует basePath.
- Не добавлять redirect со старых сайтов и не менять их DNS. Перенос старого сайта на новый домен и SEO-миграция не входят в задачу.
- Будущая публикация требует отдельной цели размещения для `.eu`, не переиспользующей production-сайт `.ru`/`.by`. Здесь подготовить только артефакт; выбор/изменение внешнего hosting project и DNS выполняется отдельным запросом пользователя.

## F. Карта файлов

Все пути ниже относительны **только** к `/Users/vadimohka/WORK/century-ai-next`. Референсные репозитории не изменять.

| Файл | Действие и единственная ответственность |
|---|---|
| `src/lib/site.ts` | Создать: константы C1 |
| `src/components/TelegramLink.tsx` | Создать: единая Telegram-ссылка |
| `src/components/Header.tsx` | Переписать статически по B1 |
| `src/components/Hero.tsx` | Переписать по B2 |
| `src/components/Scenarios.tsx` | Переписать как три статические карточки B3 |
| `src/components/Brain.tsx` | Переписать как источник-пример B4, native details |
| `src/lib/data.ts` | Заменить старыe SOURCE_DATA/WORKFLOW_DATA на два источника B4 |
| `src/components/Platform.tsx` | Четыре карточки B5, тёмная секция |
| `src/components/Trust.tsx` | Четыре карточки и три FAQ B6 |
| `src/components/Narrative.tsx` | Три статических этапа B7 |
| `src/components/Contact.tsx` | Только контент B8 и TelegramLink |
| `src/components/Footer.tsx` | B9, включая встроенный privacy details |
| `src/app/page.tsx` | Сборка лендинга в порядке B1–B9, metadata и JSON-LD главной |
| `src/app/layout.tsx` | Язык, шрифт, metadataBase; без canonical/JSON-LD главной |
| `src/app/globals.css` | Адаптация существующих токенов и стилей по C, удаление устаревших правил |
| `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/not-found.tsx` | Создать по D |
| `public/og/century-ai-eu.png` | Создать самостоятельную OG-картинку |
| `scripts/create-og.mjs`, `scripts/postbuild.mjs`, `scripts/verify-export.mjs` | Подготовка OG, packaging и проверка экспорта |
| `playwright.config.ts`, `tests/landing.spec.ts` | Небольшой набор проверок G8 |
| `package.json`, `package-lock.json`, `next.config.ts`, `CNAME`, `.github/workflows/nextjs.yml`, `.gitignore` | Настройка независимой сборки |
| `src/components/HooksSection.tsx`, `src/components/BlackPlatform.tsx`, `src/components/Drawers.tsx`, `src/components/SectionNavigator.tsx`, `src/components/ScrollToTop.tsx`, `src/hooks/useReveal.ts` | Удалить после удаления всех импортов: эти поведения не входят в финальный лендинг |
| `public/assets/sl.png`, `public/assets/qr-code.png`, `public/assets/CENTURY_White_H.png` | Удалить: новый лендинг использует текстовый логотип и самостоятельный OG |

Сначала проверить фактическое состояние файлов: если после подготовки плана появились пользовательские изменения, сохранить их и адаптировать только затронутую часть. Не выполнять reset/clean и не удалять неизвестные файлы.

## G. Пошаговое выполнение

### G1. Настроить автономный экспорт

**Files:** `src/lib/site.ts`, `next.config.ts`, `CNAME`, `scripts/postbuild.mjs`, `package.json`, `package-lock.json`, `.github/workflows/nextjs.yml`.
**Consumes:** константы C1 и правила E.
**Produces:** build от корня `.eu`, локальные assets, CI без публикации; SITE_URL/TELEGRAM_URL доступны следующим задачам.

- [x] Прочитать документ целиком, проверить `git status --short`, затем выполнить `npm ci` в target repository.
- [x] Создать константы C1 без env fallback на старый домен.
- [x] Применить конфигурацию E; сначала убрать автоматическую публикацию из workflow.
- [x] Удалить только две указанные зависимости; добавить `typecheck: tsc --noEmit`. Старый `lint: next lint` удалить: не выдавать typecheck за ESLint и не внедрять новый lint-stack в этой задаче.
- [x] Создать postbuild и проверить `npm run build`: код 0, существуют `out/index.html`, `out/CNAME` со значением `century-ai.eu` и `out/.nojekyll`.

Промежуточный build ещё может содержать старый контент — это не готовый релиз и не повод публиковать его.

### G2. Установить единственный канал контакта

**Files:** `src/components/TelegramLink.tsx`, `Contact.tsx`, `Header.tsx`, `Footer.tsx`.
**Consumes:** `TELEGRAM_URL`, `CONTACT_NAME`.
**Produces:** статический TelegramLink с интерфейсом C1; shell и contact без формы.

- [x] Создать TelegramLink ровно по C1.
- [x] Полностью удалить из Contact form state, FormData, sendToTelegram, handleSubmit, bot token, chat ID, fetch и сообщения успешной отправки. Реализовать B8.
- [x] Переписать Header по B1 и Footer по B9. Не сохранять mailto/tel/tg links, QR и team profiles.
- [x] Проверить, что все контактные ссылки используют TelegramLink; переходы внутри страницы остаются обычными якорями.
- [x] Выполнить `npm run build`. Поиск `rg -n 'NEXT_PUBLIC_TELEGRAM|api\.telegram|FormData|<form|mailto:|tel:|tg://' src` должен не находить совпадений.

### G3. Реализовать оффер и три сценария

**Files:** `Hero.tsx`, `Scenarios.tsx`, `src/app/globals.css`.
**Consumes:** TelegramLink, готовые строки B2–B3.
**Produces:** Hero с `id=home`, Scenarios с `id=use-cases`; ни tabs, ни workflow events.

- [x] Заменить Hero на B2. Удалить роли CDTO/CIO, упоминания РФ/Беларуси, бегущую строку и useReveal.
- [x] Заменить 12 старых агентов и вкладки Scenarios на три одновременно видимые карточки B3.
- [x] Удалить `openWorkflowDrawer` и кнопки открытия старых сценариев. Никакие новые страницы не создавать.
- [x] Сверить английские строки с B2–B3, особенно отсутствие числовых обещаний результата.
- [x] Выполнить `npm run build`; проверить hero/scenarios на ширине 390 px и 1440 px, когда CSS задачи G6 будет применён.

### G4. Сделать лёгкую демонстрацию с источниками

**Files:** `src/lib/data.ts`, `Brain.tsx`.
**Consumes:** B4.
**Produces:** статический пример с двумя раскрываемыми источниками, работающий без JS.

- [x] Экспортировать `SOURCE_DATA` как объект с ключами `supplier-checklist`, `approval-policy`; у каждого поля `title`, `location`, `snippet`. Точные значения — Summary без `[n]`, Location и Excerpt из B4. Удалить WORKFLOW_DATA.
- [x] Brain рендерит вопрос, ответ, badge и нативные details; label `[n]` добавить в summary при рендере. ID и ссылки совпадают с B4.
- [x] Удалить старые проценты, документы, заявления об индексации, audience-tags и события `openSourceDrawer`.
- [x] До следующего build удалить из page импорт и использование Drawers и удалить сам файл Drawers. Даже неимпортируемый `.tsx` может участвовать в TypeScript-проверке, поэтому файл с импортом удалённого WORKFLOW_DATA нельзя оставлять до G6.
- [x] Выполнить `npm run build`; проверить нативное раскрытие обоих источников клавишей Enter на summary.

### G5. Добавить платформу, контроль и понятный старт

**Files:** `Platform.tsx`, `Trust.tsx`, `Narrative.tsx`.
**Consumes:** B5–B7.
**Produces:** секции platform/security/how-we-start; никаких новых API и внешних источников.

- [x] Реализовать B5 вместо каталога «готовых» интеграций и многоуровневой архитектурной схемы.
- [x] Реализовать B6 с четырьмя карточками и тремя native details FAQ; не добавлять badges и логотипы партнёров.
- [x] Реализовать B7 как три статических шага. Удалить интервалы, IntersectionObserver, наведение для смены шага и обещания месяцев.
- [x] Удалить из этих компонентов useReveal и `'use client'`.
- [x] Выполнить `npm run build`; проверить, что все FAQ доступны с клавиатуры.

### G6. Собрать одну страницу и убрать наследие

**Files:** `src/app/page.tsx`, `globals.css`, удаляемые файлы из F.
**Consumes:** готовые восемь секций с учётом последующего добавления Founders.
**Produces:** один последовательный лендинг и отсутствие неиспользуемых старых поведений/assets.

- [x] В page оставить порядок: Header; `<main id="main-content">` с Hero, Scenarios, Brain, Platform, Trust, Narrative, Founders, Contact; Footer. Не дублировать Header/Footer в layout.
- [x] Удалить `data-section` и параметры секций, нужные старому навигатору. Каждая секция сама задаёт свой ID из B.
- [x] Применить C: обычная прокрутка, адаптивная сетка, все тексты видимы до JS. Изменять существующие CSS-блоки, не накапливать конфликтующие override в конце файла.
- [x] Удалить imports и затем неиспользуемые компоненты/hooks/assets, перечисленные в F. Проверить отсутствующие импорты через build.
- [x] Сделать видимый `:focus-visible` для ссылок и summary; якорные ссылки не должны скрывать заголовок под header.
- [x] Проверить `npm run build` и `npm run typecheck`.

### G7. Закрыть SEO и проверку изоляции

**Files:** `layout.tsx`, `page.tsx`, `sitemap.ts`, `robots.ts`, `not-found.tsx`, `scripts/create-og.mjs`, `public/og/century-ai-eu.png`, `scripts/verify-export.mjs`.
**Consumes:** C1, D, готовый export.
**Produces:** одна индексируемая английская страница `.eu`, 404, OG и автоматическая проверка критичных остатков.

- [x] Удалить старые metadata и JSON-LD из layout. Оставить в нём metadataBase, шрифт latin и html lang en; остальные metadata и минимальный JSON-LD главной разместить в page по D. Удалить прежние Person/Organization/sameAs/address и verification token.
- [x] Создать sitemap, robots и английский not-found. Проверить, что Next выдаёт noindex на 404; если встроенный meta уже присутствует, не создавать противоречивый index meta.
- [x] Добавить devDependency `@playwright/test`, установить Chromium и создать PNG по D3 командой `npm run assets:og` (`node scripts/create-og.mjs`). Сохранить готовый PNG в репозитории.
- [x] Создать `scripts/verify-export.mjs`, команду `check:export: node scripts/verify-export.mjs`. Использовать только Node fs/path/assert. Скрипт читает `out`, не меняет файлы и не выполняет внешние запросы.
- [x] Скрипт проверяет наличие index.html/404.html/robots.txt/sitemap.xml/CNAME/.nojekyll/OG PNG, правильный CNAME, единственный URL sitemap и правильный sitemap URL в robots.
- [x] Скрипт рекурсивно сканирует текстовые `.html/.js/.json/.txt/.xml/.css` в `out` на запрещённые строки: `century-ai.by`, `century-ai.ru`, `hoster.by`, `mc.yandex`, `metrika`, `googletagmanager`, `google-analytics`, `api.telegram.org`, `NEXT_PUBLIC_TELEGRAM`, старый verification token, `/century-ai-next/`. Совпадение — FAIL с путём файла, без печати секретов.
- [x] Старый verification token для deny-list взять из исходной версии layout, но хранить только в проверочном скрипте; в runtime/site он отсутствует. Не сканировать документацию как публичный контент.
- [x] Убедиться, что в экспортируемых HTML нет `<form`, `<input`, `<textarea`, `<select`. Не проверять запрет слова `form` вообще: оно встречается в `platform`.
- [x] Скрипт проверяет размер PNG по IHDR: 1200×630. При успехе печатает `Export checks passed`, иначе exit 1.
- [x] Выполнить `npm run build`, `npm run typecheck`, `npm run check:export` и прочитать результаты.

### G8. Выполнить браузерные проверки и передать результат

**Files:** `playwright.config.ts`, `tests/landing.spec.ts`, package scripts, `.gitignore`, CI.
**Consumes:** готовый `out`.
**Produces:** проверенный статический artifact без публикации.

- [x] Настроить Playwright Chromium, baseURL `http://127.0.0.1:4173`, webServer `python3 -m http.server 4173 --bind 127.0.0.1 --directory out`. Python 3 используется только для локальной проверки; runtime сайта остаётся статическим. CI Ubuntu поддерживает эту команду.
- [x] Добавить `test:e2e: playwright test`; `.gitignore` дополнить `playwright-report/` и `test-results/`.
- [x] Реализовать ровно следующие пользовательские проверки, без snapshot-тестов каждого абзаца и без дублирования всей разметки в тестах:

| Test name | Assertions |
|---|---|
| `English page and independent SEO` | На `/` статус 200; lang en; один H1; title из C1; canonical/og:url `.eu/`; нет hreflang; JSON-LD разбирается и содержит только указанные WebSite/WebPage с `.eu` URL. В видимом тексте и alt/aria-label/title нет кириллицы. На `/404.html` английский текст, noindex и нет canonical/JSON-LD главной. |
| `Contact and founder links use approved destinations` | Есть CTA в header, hero и contact. Каждый внешний href равен `https://t.me/vitalibakhmat` или `https://vadimohka.com/`, или `https://www.linkedin.com/in/ekrychev/`, target blank, rel содержит noopener+noreferrer. Нет форм и полей, mailto/tel/tg links и bot-запросов. Не отправлять реальное сообщение и не заходить в чужой Telegram-аккаунт. |
| `Local resources and working anchors` | Сбор сетевых запросов начинается до goto. Все HTTP(S) запросы при загрузке/прокрутке имеют origin локального тестового сервера, все CSS/JS/images отвечают без 4xx/5xx. Для каждого href с hash существует ровно один соответствующий ID. Нет ошибок pageerror. |
| `Readable without JavaScript` | Новый browser context с javaScriptEnabled false: видны H1, три карточки, source example, security, process и Telegram CTA; можно раскрыть native details. Нет пустой страницы/зависимости от hydration. |
| `Sources and FAQs work with a keyboard` | Tab достигает summary источника и FAQ; Enter раскрывает правильное содержимое. Проверить оба источника и один FAQ. Ссылки [1]/[2] ведут к правильным ID. |
| `Mobile and reduced motion remain usable` | Viewport 390×844 и 1440×900, reducedMotion reduce: scrollWidth не больше clientWidth + 1; ссылки и CTA не обрезаны, секции не имеют scroll snap, нижний контакт достижим обычной прокруткой. Сохранить два full-page screenshots и визуально проверить их. |

- [x] Использовать следующие команды по порядку (working directory — target repository):

```bash
npm ci
npx playwright install chromium
npm run build
npm run typecheck
npm run check:export
npm run test:e2e
git diff --check
git status --short
```

- [x] В CI Chromium установить через `npx playwright install --with-deps chromium`; использовать `npm run build`, чтобы выполнился postbuild. Не вызывать отдельный `next build` в обход packaging.
- [x] Вручную посмотреть оба screenshot. Исправить обрезание, наложения и пустые секции до сдачи; скриншотный тест сам по себе этого не доказывает.
- [x] В финальном сообщении исполнителя указать изменённые файлы, реально выполненные проверки и расположение `out`. Не писать «опубликовано», «Google проиндексировал» или «конверсия выросла».

## H. Definition of Done

- [x] Это один самостоятельный лендинг `century-ai.eu`, не копия всего референсного сайта и не языковая версия другого домена.
- [x] На сайте нет hoster.by, связей с `.by`/`.ru`, старой аналитики и verification token.
- [x] Все публичные тексты английские, включая скрываемые details, accessibility labels и 404.
- [x] Контактный переход — точный Telegram Виталия; в блоке фаундеров и команды также разрешены личный сайт Вадима `https://vadimohka.com/` и LinkedIn Егора `https://www.linkedin.com/in/ekrychev/`. Никаких форм, ботов, секретов и фоновых запросов к Telegram.
- [x] Все три сильных хука, статический пример, ограничения контроля и этапы начала работы присутствуют.
- [x] Нет выдуманных результатов, EU-реквизитов, сертификатов и обещаний EU residency.
- [x] Основной контент и источники доступны без JavaScript; адаптивность проверена визуально.
- [x] Canonical, JSON-LD, sitemap, robots, CNAME, OG и asset paths согласованы с `.eu`.
- [x] В CI нет публикации на существующие площадки; готов отдельный статический artifact.
- [x] Build, typecheck, export check, browser tests и diff check прошли; фактический результат записан исполнителем.

## I. Источники решений — только для исполнителя, не для сайта

Референс изучался в `/Users/vadimohka/WORK/century-ai.by`: идеи из `src/lib/home-i18n.ts` и `src/lib/site-content.ts`. Не добавлять эти пути, домен или атрибуцию в пользовательский интерфейс. Не импортировать код из этого репозитория. Исключение для assets: только локально скопированные портреты Виталия, Вадима и Егора из последующего запроса пользователя. Наличие названия референса в этом техническом документе не является связью опубликованного сайта.

Проверенные первичные технические источники:

- [Next.js 15: Static exports](https://nextjs.org/docs/15/app/guides/static-exports) — статический HTML, output export, trailingSlash.
- [Google: Managing multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) — `.eu` рассматривается как generic regional domain.
- [Google: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions) — hreflang описывает реально существующие языковые/региональные версии, которых здесь нет.
- [Google: Site names](https://developers.google.com/search/docs/appearance/site-names) — WebSite для названия самостоятельного сайта.

Исполнитель читает этот файл как достаточное задание. Повторное исследование исходного сайта и расширение объёма не требуются. Если обнаружена техническая несовместимость, исправлять её в рамках заданного поведения и явно описать отклонение; не менять маркетинговую концепцию по собственной инициативе.

## J. Execution result — 2026-10-26

Implemented in branch `codex/century-ai-eu` in the target repository. The complete static artifact is in `out/`; no publication, DNS change, merge or push was performed.

Verified: clean `npm ci`; Next.js production build and postbuild packaging; TypeScript; export isolation check; all 6 Playwright checks; `git diff --check`; production dependency audit with 0 vulnerabilities. Mobile (390 px) and desktop (1440 px) screenshots were inspected. A keyboard skip-link regression was reproduced and fixed with a focusable main target.

Implementation decisions:

- Used a separate branch in the requested checkout, preserving the saved plan; no additional worktree was created.
- Added a local favicon and a short README for development/export commands.
- Kept Next.js 15 and raised its patch floor to 15.5.28; overrode transitive PostCSS to a patched v8 release. Build and browser checks confirm compatibility.
- Removed the unsupported `next start` command for static exports. Use `npm run dev` for development or a static server for `out/`.
- Performed a separate author review without agents, in accordance with this plan's no-agent instruction. No unresolved functional findings remain.

There are no added customer results, forms, trackers, shared domain metadata or automatic deployment steps. Re-run the commands in G8 after future changes. SEO indexing and public hosting are outside this local implementation result.

## K. User revision — founders restored, 2026-10-26

The user requested restoring the founders block and links to Vadim Vladymtsev's personal website. This revision overrides the earlier exclusion of team content and the Telegram-only rule for non-contact external links.

- Added `src/components/Founders.tsx` after Narrative and before Contact, section ID `founders`.
- Heading: `The people behind Century.`; cards: Vitali Bakhmat and Vadim Vladymtsev, both labelled `Co-founder`.
- Vitali: `Business development and customer partnerships.`; Telegram remains his contact.
- Vadim: `Enterprise AI architecture and engineering.`; his name and `vadimohka.com` link directly to `https://vadimohka.com/`, opening a new tab with noopener/noreferrer.
- Two small portraits are copied into `public/founders/` and served locally. There is no runtime connection to a reference website.
- Footer navigation includes `Founders`. The English single-page structure, independent EU SEO, lack of forms and background third-party loads remain in effect.
- Updated the existing destination acceptance test and no-JavaScript coverage. No additional test suite or external tracking was introduced.

## L. User revision — compact team and Egor, 2026-10-26

The user requested adding Egor Krychev and reducing the visual prominence of the team block to preserve the focus on the product. This revision supersedes the larger two-card layout in K.

- Added Egor Krychev, role `CAIO`, with a locally served portrait and `https://www.linkedin.com/in/ekrychev/` links on his name and LinkedIn label. Name spelling matches his public LinkedIn profile; role matches the existing team material.
- Section heading is `Founders & team`, 20px. Three cards share one desktop row; portraits are 64×64, names 17px, outer vertical padding 40px (32px on mobile).
- Removed the long biographies, oversized title and large portraits. Cards retain accessible link targets and stack on smaller screens.
- Approved external destinations are exactly Vitali's Telegram, Vadim's personal site and Egor's LinkedIn. Product contact CTA still goes only to Vitali's Telegram.
- Updated the existing destination check to cover all three people and the exact LinkedIn destination. All assets remain local; no embeds or tracking were added.

## M. User revision — role descriptions restored, 2026-10-26

The user requested restoring job descriptions and explicitly identifying Egor as a co-founder. The compact layout, 64px portraits, small heading and existing profile links remain.

- Heading: `Founders`.
- Vitali Bakhmat: `Co-founder · CEO`; `Business development and customer partnerships.`
- Vadim Vladymtsev: `Co-founder · CTO`; `Enterprise AI architecture and engineering.`
- Egor Krychev: `Co-founder · CAIO`; `AI automation, agents and business processes.`
- Descriptions use a short secondary text style; the product sections retain visual priority.

## N. User revision — publish entirely from main, 2026-10-26

The user requested publication from main and changed Pages Source to GitHub Actions. This request supersedes earlier constraints that disabled automatic deployment and retained gh-pages for hosting.

- Source code, build configuration, tests and workflow live in main. Generated output remains ignored and is uploaded as a Pages artifact from out/.
- `.github/workflows/nextjs.yml` runs the existing build, typecheck, export isolation check and browser tests, then uses `actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4`.
- Deployment requires successful validation and is allowed only for refs/heads/main outside pull_request events. It targets the github-pages environment with pages:write and id-token:write scoped to the deploy job.
- The custom domain remains century-ai.eu. The Pages source must be GitHub Actions, not main/root branch publication.
- After the replacement deploy succeeds, the obsolete gh-pages branch can be removed. Future deployments use main only.
