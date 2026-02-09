'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useReveal } from '@/hooks/useReveal'

function animateNumber(node: HTMLElement, target: number) {
  const prefersReduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    node.textContent = String(target)
    return
  }
  const duration = 1100
  const start = performance.now()
  function frame(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    node.textContent = String(Math.round(target * eased))
    if (progress < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

const metrics = [
  { values: [4, 6], suffix: ' недель', sep: '\u2013', title: 'до кейса в промышленной эксплуатации' },
  { values: [90], suffix: ' дней', sep: '', title: 'до модели управления портфелем' },
  { values: [1], suffix: ' контур', sep: '', title: 'для бизнеса, ИТ, ИБ и аудита' },
  { values: [360], suffix: '\u00B0', sep: '', title: 'прозрачность качества и рисков' },
]

const rollout = [
  { num: '01', title: 'Стартовая сессия', text: 'KPI, ограничения и выбор первого кейса.' },
  { num: '02', title: 'Оценка готовности', text: 'Данные, интеграции, политики ИБ, роли и владельцы.' },
  { num: '03', title: 'Спринт внедрения', text: '4–6 недель до запуска с оценкой качества и контрольными точками.' },
  { num: '04', title: 'Масштабирование', text: 'Тиражирование на портфель по единому стандарту.' },
]

export default function Proof() {
  const { ref, className, style } = useReveal()
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const animated = useRef(false)

  const flatValues = metrics.flatMap((m) => m.values)

  const startCounters = useCallback(() => {
    if (animated.current) return
    animated.current = true
    counterRefs.current.forEach((el, i) => {
      if (el && flatValues[i] !== undefined) {
        animateNumber(el, flatValues[i])
      }
    })
  }, [flatValues])

  useEffect(() => {
    const strip = document.querySelector('.metric-strip')
    if (!strip || !('IntersectionObserver' in window)) {
      startCounters()
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounters()
          obs.disconnect()
        }
      },
      { threshold: 0.45 }
    )
    obs.observe(strip)
    return () => obs.disconnect()
  }, [startCounters])

  let refIdx = 0

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
          Этапность, критерии успеха и контрольные точки для CDTO, ИТ, ИБ и
          бизнеса.
        </p>
      </div>

      <div
        className="shell metric-strip"
        aria-label="Ключевые метрики внедрения"
      >
        {metrics.map((m, mi) => {
          const spans = m.values.map((v) => {
            const idx = refIdx++
            return (
              <span
                key={idx}
                ref={(el) => {
                  counterRefs.current[idx] = el
                }}
              >
                0
              </span>
            )
          })

          return (
            <article className="metric-card" key={mi}>
              <p className="metric-value">
                {spans.length === 2 ? (
                  <>
                    {spans[0]}{m.sep}{spans[1]}{m.suffix}
                  </>
                ) : (
                  <>
                    {spans[0]}{m.suffix}
                  </>
                )}
              </p>
              <h3>{m.title}</h3>
            </article>
          )
        })}
      </div>

      <div className="shell rollout">
        {rollout.map((r) => (
          <article key={r.num}>
            <p>{r.num}</p>
            <h3>{r.title}</h3>
            <span>{r.text}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

