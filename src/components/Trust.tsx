'use client'

import { useReveal } from '@/hooks/useReveal'

const cards = [
  { title: 'Развёртывание', text: 'Локальное или изолированное развёртывание в пределах корпоративного периметра.', href: '#trust-deployment' },
  { title: 'Контроль доступа', text: 'IAM, роли и уровневые ограничения доступа для каждого ответа агента.', href: '#trust-access' },
  { title: 'Аудит', text: 'Неизменяемые логи запросов, цитат, решений и действий в едином журнале.', href: '#trust-audit' },
  { title: 'Качество', text: 'Контур оценки и мониторинга: метрики качества, рисков и стабильности в эксплуатации.', href: '#trust-quality' },
]

const details = [
  { id: 'trust-deployment', label: 'Размещение', title: 'Локальный / изолированный контур', text: 'Размещение внутри инфраструктуры компании с контролем сетевого и юридического периметра.' },
  { id: 'trust-access', label: 'Доступ', title: 'Ролевая модель доступа', text: 'Ответ строится только по источникам, на которые у пользователя есть разрешение.' },
  { id: 'trust-audit', label: 'Аудит', title: 'Сквозная трассируемость решений', text: 'Фиксируются запрос, источники, версия политики, результат и исполнитель.' },
  { id: 'trust-quality', label: 'Качество', title: 'Оценка и наблюдаемость', text: 'Пороговые значения качества и рисков помогают управлять портфелем кейсов на уровне CDTO.' },
]

export default function Trust() {
  const { ref, className, style } = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`section trust-section trust-section-stacklevel ${className}`}
      id="trust"
      style={style}
    >
      <div className="shell trust-block">
        <div className="trust-head">
          <h3>
            <span className="trust-title-main">Доверие</span> и{' '}
            <span className="trust-title-accent">управление</span>
          </h3>
          <p>
            Доказательная рамка для корпоративного внедрения: владение данными,
            контроль доступа, аудит и качество.
          </p>
        </div>

        <div className="proofpoint-grid">
          {cards.map((c) => (
            <article className="proofpoint-card" key={c.title}>
              <h4>{c.title}</h4>
              <p>{c.text}</p>
              <a href={c.href}>Подробнее</a>
            </article>
          ))}
        </div>

        <div className="trust-details">
          {details.map((d) => (
            <article key={d.id} id={d.id}>
              <p>{d.label}</p>
              <h4>{d.title}</h4>
              <span>{d.text}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

