'use client'

import { useReveal } from '@/hooks/useReveal'

const connectors = [
  { title: 'ERP', text: 'Финансы, закупки, план-факт' },
  { title: 'СЭД', text: 'Договоры, регламенты, архив' },
  { title: 'CRM', text: 'Клиенты, сделки, коммуникации' },
  { title: 'ITSM', text: 'Заявки, SLA, маршрутизация' },
  { title: 'IAM', text: 'Роли, доступы, группы' },
  { title: 'SIEM', text: 'События ИБ и расследования' },
  { title: 'DWH', text: 'Витрины, отчёты, метрики' },
  { title: 'Портал', text: 'Корпоративные порталы и базы знаний' },
]

const principles = [
  {
    title: 'Синхронизация и поиск по источникам',
    text: 'Индексируем и ищем по документам, процессным системам и данным в едином контуре.',
  },
  {
    title: 'Ответы по правам доступа',
    text: 'Ответы зависят от ролей и прав доступа, а не только от текста запроса.',
  },
  {
    title: 'Единая панель управления',
    text: 'Политики, аудит и наблюдаемость управляются в одной панели контроля.',
  },
]

const layers = [
  { layer: 'СЛОЙ 1', title: 'БИЗНЕС-ПРИЛОЖЕНИЯ', text: 'Фронт, риски, операции, поддержка' },
  { layer: 'СЛОЙ 2', title: 'СРЕДА АГЕНТОВ И ПРОЦЕССОВ', text: 'Маршрутизация, проверки политик, контроль действий' },
  { layer: 'СЛОЙ 3', title: 'ЗНАНИЯ И ДАННЫЕ', text: 'Документы, индексы, корпоративные контуры данных' },
  { layer: 'СЛОЙ 4', title: 'УПРАВЛЕНИЕ И БЕЗОПАСНОСТЬ', text: 'Идентификация, наблюдаемость, аудит, суверенный контур' },
]

export default function Platform() {
  const { ref, className, style } = useReveal(210)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`section platform ${className}`}
      id="platform"
      style={style}
    >
      <div className="shell section-head">
        <h2>Технологии и интеграции под единым контролем</h2>
        <p>
          Архитектура для регулируемой среды: сменяемые компоненты без вендорской
          зависимости, локальное размещение, проверяемая достоверность и
          операционная устойчивость.
        </p>
      </div>

      <div className="shell platform-panel">
        <div className="connectors-head">
          <h3>Коннекторы</h3>
          <p>
            Единый контур подключений к данным и системам: агент хорош настолько,
            насколько качественный контекст он получает.
          </p>
        </div>

        <div className="connector-grid" aria-label="Сетка коннекторов">
          {connectors.map((c) => (
            <article className="connector-card" key={c.title}>
              <p>{c.title}</p>
              <span>{c.text}</span>
            </article>
          ))}
        </div>

        <div className="connector-principles">
          {principles.map((p) => (
            <article key={p.title}>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </article>
          ))}
        </div>

        <div className="architecture-grid">
          {layers.map((l) => (
            <article key={l.layer}>
              <p>{l.layer}</p>
              <h4>{l.title}</h4>
              <span>{l.text}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

