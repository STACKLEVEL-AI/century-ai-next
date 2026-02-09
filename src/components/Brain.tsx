'use client'

import { useCallback } from 'react'
import { useReveal } from '@/hooks/useReveal'

const sources = [
  { id: 'source-q3', name: 'Q3_Management_Report_2025.pdf', status: 'Проиндексирован \u2022 с контролем доступа' },
  { id: 'source-contract', name: 'Master_Supply_Contract_v7.docx', status: 'Проиндексирован \u2022 с контролем доступа' },
  { id: 'source-policy', name: 'Policy_PD_17_Data_Protection.pdf', status: 'Проиндексирован \u2022 с контролем доступа' },
  { id: 'source-sla', name: 'ITSM_SLA_Q3_2025.csv', status: 'Проиндексирован \u2022 с контролем доступа' },
]

export default function Brain() {
  const { ref, className, style } = useReveal()

  const openSource = useCallback((sourceId: string) => {
    window.dispatchEvent(
      new CustomEvent('openSourceDrawer', { detail: sourceId })
    )
  }, [])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`section motion ${className}`}
      id="brain"
      style={style}
    >
      <div className="shell section-head">
        <h2>Ядро платформы: проверяемые ответы</h2>
        <p>
          Демонстрация продуктового режима: слева источники и статусы доступа,
          справа ответ агента с проверяемыми ссылками. Результаты учитывают
          права доступа и готовы для аудита.
        </p>
      </div>

      <div className="shell brain-board">
        <article className="brain-sources">
          <p className="brain-label">Источники</p>
          <ul className="brain-source-list">
            {sources.map((s) => (
              <li key={s.id}>
                <button
                  className="source-item"
                  type="button"
                  onClick={() => openSource(s.id)}
                >
                  {s.name}
                  <span>{s.status}</span>
                </button>
              </li>
            ))}
          </ul>
        </article>

        <article className="brain-answer">
          <p className="brain-label">Ответ агента</p>
          <p>
            По итогам Q3 наибольшее отклонение маржи связано с ростом затрат на
            логистику и штрафами по SLA{' '}
            <button
              className="citation-badge"
              type="button"
              onClick={() => openSource('source-q3')}
            >
              [1]
            </button>
            . В договоре с поставщиком есть риск по одностороннему изменению
            сроков без SLA-компенсации{' '}
            <button
              className="citation-badge"
              type="button"
              onClick={() => openSource('source-contract')}
            >
              [2]
            </button>
            .
          </p>
          <p>
            Для ответа на вопрос о ПДн агент использует только разрешённые
            разделы политики и не показывает закрытые документы{' '}
            <button
              className="citation-badge"
              type="button"
              onClick={() => openSource('source-policy')}
            >
              [3]
            </button>
            .
          </p>
          <p className="permission-indicator">
            Ответы учитывают права доступа
          </p>
        </article>
      </div>
    </section>
  )
}

