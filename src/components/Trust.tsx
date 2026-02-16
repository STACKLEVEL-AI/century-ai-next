'use client'

import { useReveal } from '@/hooks/useReveal'

const trustFeatures = [
  {
    id: 1,
    title: 'Развёртывание',
    description: 'Локально или в изолированном контуре. Данные под вашим полным контролем.',
    details: 'Размещение внутри инфраструктуры компании с соблюдением юридических требований.'
  },
  {
    id: 2,
    title: 'Контроль доступа',
    description: 'Ролевая модель IAM: ответы только из разрешённых источников.',
    details: 'Интеграция с корпоративной системой управления доступом.'
  },
  {
    id: 3,
    title: 'Аудит',
    description: 'Неизменяемый журнал всех действий и решений.',
    details: 'Фиксируются запрос, источники, версия политики и результат.'
  },
  {
    id: 4,
    title: 'Качество',
    description: 'Мониторинг метрик и рисков в реальном времени.',
    details: 'Пороговые значения качества для управления портфелем кейсов.'
  }
]

export default function Trust() {
  const { ref, className, style } = useReveal()

  return (
      <section
          ref={ref as React.RefObject<HTMLElement>}
          className={`section trust ${className}`}
          id="trust"
          style={style}
      >
        <div className="shell">
          {/* Заголовок секции */}
          <div className="section-head">
            <h2>Доверие и управление</h2>
            <p>
              Доказательная рамка для корпоративного внедрения ИИ:
              безопасность, прозрачность и контроль на каждом уровне.
            </p>
          </div>

          {/* Сетка с карточками */}
          <div className="trust-grid">
            {trustFeatures.map((feature) => (
                <article key={feature.id} className="trust-card">
                  <div className="trust-card-content">
                    <div className="trust-card-header">
                      <span className="trust-number">{feature.id.toString().padStart(2, '0')}</span>
                      <h3>{feature.title}</h3>
                    </div>
                    <p className="trust-description">{feature.description}</p>
                    <p className="trust-detail">{feature.details}</p>
                  </div>
                </article>
            ))}
          </div>
        </div>
      </section>
  )
}