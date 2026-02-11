'use client'

import { useReveal } from '@/hooks/useReveal'

export default function Proof() {
  const { ref, className, style } = useReveal()

  return (
      <section
          ref={ref as React.RefObject<HTMLElement>}
          className={`section proof ${className}`}
          id="proof"
          style={style}
      >
        <div className="shell section-head">
          <h2>Дорожная карта до управленческого решения</h2>
          <p>
            Четкие этапы с измеримыми результатами: от первого кейса до управляемого портфеля ИИ-сервисов.
          </p>
        </div>

        <div className="shell results-timeline">
          <div className="timeline-phase">
            <div className="phase-header">
              <span className="phase-duration">Месяц 1</span>
              <h3>Подготовка и старт</h3>
            </div>
            <ul className="phase-results">
              <li>Выбор и согласование кейса с KPI</li>
              <li>Оценка готовности данных и систем</li>
            </ul>
          </div>

          <div className="timeline-phase">
            <div className="phase-header">
              <span className="phase-duration">Месяц 2</span>
              <h3>Внедрение и запуск</h3>
            </div>
            <ul className="phase-results">
              <li>Промышленный запуск первого кейса</li>
              <li>Интеграция в рабочие процессы</li>
            </ul>
          </div>

          <div className="timeline-phase">
            <div className="phase-header">
              <span className="phase-duration">Месяц 3</span>
              <h3>Масштабирование</h3>
            </div>
            <ul className="phase-results">
              <li>Тиражирование на 2-3 дополнительных сценария</li>
              <li>Формирование модели управления портфелем</li>
            </ul>
          </div>
        </div>
      </section>
  )
}