'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useReveal } from '@/hooks/useReveal'

const steps = [
  {
    id: '1',
    label: 'ЭТАП 01',
    screenTitle: 'ЭКОНОМИКА КЕЙСА',
    screenText:
      'Выбор процесса, владелец, базовый уровень и целевой эффект в цифрах.',
    index: '01',
    title: 'Сначала фиксируем экономику',
    text: 'Фокус на одном приоритетном кейсе: KPI, целевая выгода, владелец и критерии успеха.',
    result: 'Результат: инвестиционная логика понятна руководству.',
  },
  {
    id: '2',
    label: 'ЭТАП 02',
    screenTitle: 'КОНТУР РИСКОВ',
    screenText:
      'Политики ИБ, доступы, трассируемость и проверяемость решений.',
    index: '02',
    title: 'Параллельно проектируем контроль',
    text: 'ИБ, риск-офис, комплаенс и аудит включаются до запуска: политики, источники и журнал решений.',
    result: 'Результат: сценарий проходит проверку без блокирующих доработок.',
  },
  {
    id: '3',
    label: 'ЭТАП 03',
    screenTitle: 'МАСШТАБИРОВАНИЕ',
    screenText:
      'Шаблон тиражирования: стандарты качества, роли, контроль изменений.',
    index: '03',
    title: 'Сразу готовим масштабирование',
    text: 'Первый кейс в промышленной эксплуатации становится тиражируемым стандартом для портфеля.',
    result: 'Результат: рост без потери качества и управляемости.',
  },
]

export default function Narrative() {
  const { ref, className, style } = useReveal(140)
  const [active, setActive] = useState(0)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  const stopRotation = useCallback(() => {
    if (autoRef.current) {
      clearInterval(autoRef.current)
      autoRef.current = null
    }
  }, [])

  const startRotation = useCallback(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || autoRef.current) return
    autoRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, 3600)
  }, [])

  useEffect(() => {
    const board = boardRef.current
    if (!board) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startRotation()
        else stopRotation()
      },
      { threshold: 0.25, rootMargin: '-8% 0px -8% 0px' }
    )
    obs.observe(board)

    const onVisChange = () => {
      if (document.hidden) stopRotation()
      else startRotation()
    }
    document.addEventListener('visibilitychange', onVisChange)

    return () => {
      obs.disconnect()
      stopRotation()
      document.removeEventListener('visibilitychange', onVisChange)
    }
  }, [startRotation, stopRotation])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`section narrative ${className}`}
      aria-label="Логика программы внедрения"
      style={style}
    >
      <div className="shell section-head">
        <h2>Контур CDTO: экономика, риск, масштаб</h2>
        <p>
          Ниже — последовательность, которая превращает ИИ-инициативу из
          технологического эксперимента в защищаемое управленческое решение.
        </p>
      </div>

      <div
        className="shell contour-board"
        ref={boardRef}
        onMouseLeave={startRotation}
      >
        <aside
          className="contour-visual"
          data-state={steps[active].id}
          aria-live="polite"
        >
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`contour-screen contour-screen-${s.id}`}
            >
              <p>{s.label}</p>
              <h3>{s.screenTitle}</h3>
              <span>{s.screenText}</span>
            </div>
          ))}
          <div className="contour-meter" aria-hidden="true">
            <span />
          </div>
        </aside>

        <div className="contour-steps" role="tablist" aria-label="Контур CDTO">
          {steps.map((s, i) => (
            <button
              key={s.id}
              className={`contour-step${i === active ? ' is-active' : ''}`}
              type="button"
              data-step={s.id}
              aria-selected={i === active}
              onClick={() => setActive(i)}
              onMouseEnter={() => {
                stopRotation()
                setActive(i)
              }}
            >
              <p className="contour-step-index">{s.index}</p>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span>{s.result}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

