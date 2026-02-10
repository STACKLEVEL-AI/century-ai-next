'use client'

import { useReveal } from '@/hooks/useReveal'

export default function Hero() {
  const { ref, className, style } = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`hero ${className}`}
      id="home"
      style={style}
    >
      <div className="shell hero-layout">
        <div className="hero-copy">
          <h1>
            LLM в&nbsp;корпорации —<br />
            из пилота<br />
            в&nbsp;<span>управленческое решение</span>
          </h1>
          <p className="hero-lead">
            Century — корпоративная платформа и конвейер внедрения LLM&#8209;сервисов
            для крупных организаций РФ и Беларуси. От выбора первого кейса с KPI до
            промышленного запуска: контур внутри периметра (on&#8209;prem/air&#8209;gapped),
            верификация ответов (RAG&nbsp;+ цитаты), логирование и аудит.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-blue">
              Обсудить кейс и KPI
            </a>
            <a href="#proof" className="btn btn-ghost">
              Посмотреть дорожную карту
            </a>
          </div>

          <ul className="hero-signals" aria-label="Ключевые сигналы">
            <li>Локально (on&#8209;prem) / изолированный контур (air&#8209;gapped)</li>
            <li>Гибридный RAG + цитирование источников</li>
            <li>Наблюдаемость + журнал аудита</li>
            <li>OpenAI&#8209;совместимый API + сменяемые компоненты</li>
          </ul>
        </div>

        <div className="hero-showcase" aria-label="Проектные акценты">
          <article className="show-card show-card-blue">
            <p className="show-type">Диагностика и стратегия</p>
            <h3>Бизнес-кейс с управляемой экономикой</h3>
            <span>Владелец, KPI, базовый уровень, целевой эффект</span>
          </article>

          <article className="show-card show-card-black">
            <p className="show-type">Безопасный запуск</p>
            <h3>Контур ИБ/комплаенса — часть продукта</h3>
            <span>Проверки политик, трассируемость, контрольные точки</span>
          </article>

          <article className="show-card show-card-light">
            <p className="show-type">Масштабирование</p>
            <h3>Портфель ИИ-сценариев вместо витрины пилотов</h3>
            <span>Модель управления, ритм тиражирования, SLA</span>
          </article>
        </div>
      </div>
    </section>
  )
}