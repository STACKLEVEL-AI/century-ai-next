'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useReveal } from '@/hooks/useReveal'

const steps = [
    {
        id: '1',
        label: 'ЭТАП 01',
        screenTitle: 'ЭКОНОМИКА КЕЙСА',
        screenText: 'Выбор процесса, владелец, базовый уровень и целевой эффект в цифрах.',
        index: '01',
        title: 'Подготовка и старт (месяц 1)',
        subtitle: 'Сначала фиксируем экономику',
        text: 'Фокус на одном приоритетном кейсе: KPI, целевая выгода, владелец и критерии успеха.',
        result: 'Инвестиционная логика понятна руководству.',
        phaseDescription: 'Выбор и согласование кейса с KPI, оценка готовности данных и систем.',
        results: [
            'Выбор и согласование кейса с KPI',
            'Оценка готовности данных и систем',
            'Определение владельца и целевых метрик'
        ],
        keyOutcome: 'Инвестиционная логика утверждена'
    },
    {
        id: '2',
        label: 'ЭТАП 02',
        screenTitle: 'КОНТУР РИСКОВ',
        screenText: 'Политики ИБ, доступы, трассируемость и проверяемость решений.',
        index: '02',
        title: 'Внедрение и запуск (месяц 2)',
        subtitle: 'Параллельно проектируем контроль',
        text: 'ИБ, риск-офис, комплаенс и аудит включаются до запуска: политики, источники и журнал решений.',
        result: 'Сценарий проходит проверку без блокирующих доработок.',
        phaseDescription: 'Промышленный запуск первого кейса, интеграция в рабочие процессы.',
        results: [
            'Промышленный запуск первого кейса',
            'Интеграция в рабочие процессы',
            'Проверка политик ИБ и комплаенса'
        ],
        keyOutcome: 'Запуск с подтверждённой безопасностью'
    },
    {
        id: '3',
        label: 'ЭТАП 03',
        screenTitle: 'МАСШТАБИРОВАНИЕ',
        screenText: 'Шаблон тиражирования: стандарты качества, роли, контроль изменений.',
        index: '03',
        title: 'Масштабирование (месяц 3)',
        subtitle: 'Сразу готовим масштабирование',
        text: 'Первый кейс в промышленной эксплуатации становится тиражируемым стандартом для портфеля.',
        result: 'Рост без потери качества и управляемости.',
        phaseDescription: 'Тиражирование на 2-3 дополнительных сценария',
        results: [
            'Тиражирование на 2-3 дополнительных сценария',
            'Формирование модели управления портфелем',
            'Запуск системы метрик и аудита'
        ],
        keyOutcome: 'Управляемый портфель ИИ-сервисов'
    },
]

export default function Narrative({ ...props }: any) {
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
        }, 4000)
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
            id="narrative"
            {...props}
            style={style}
        >
            <div className="shell section-head">
                <h2>Дорожная карта CDTO к масштабируемым решениям</h2>
                <p>
                    Путь от первого кейса до управляемого портфеля ИИ-сервисов через три этапа внедрения:
                    от идеи до безопасной промышленной эксплуатации с измеримым результатом
                </p>
            </div>

            <div
                className="shell contour-board"
                ref={boardRef}
                onMouseEnter={stopRotation}
                onMouseLeave={startRotation}
            >
                <aside className="contour-visual">
                    <div className="timeline-mini mobile-only">
                        {steps.map((s, i) => (
                            <button
                                key={s.id}
                                className={`timeline-dot ${i === active ? 'active' : ''}`}
                                onClick={() => {
                                    stopRotation()
                                    setActive(i)
                                }}
                                onMouseEnter={() => {
                                    stopRotation()
                                    setActive(i)
                                }}
                            >
                                <span className="dot-number">{s.index}</span>
                            </button>
                        ))}
                        <div className="timeline-line">
    <span
        className="line-fill"
        style={{ width: `${((active + 1) / steps.length) * 100}%` }}
    />
                        </div>
                    </div>

                    <div className="desktop-layout">
                        <div className="timeline-vertical">
                            {steps.map((s, i) => (
                                <button
                                    key={s.id}
                                    className={`timeline-vertical-dot ${i === active ? 'active' : ''} ${i < active ? 'completed' : ''}`}
                                    onClick={() => {
                                        stopRotation()
                                        setActive(i)
                                    }}
                                    onMouseEnter={() => {
                                        stopRotation()
                                        setActive(i)
                                    }}
                                >
                                    <span className="vertical-dot-number">{s.index}</span>
                                </button>
                            ))}
                            <div className="timeline-vertical-line">
                                <div
                                    className="vertical-line-fill"
                                    style={{ height: `${((active + 1) / steps.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="stage-content">
                            <h3 className="stage-title">
                                <span className="stage-index">{steps[active].index}</span>
                                {steps[active].title}
                            </h3>

                            <div className="stage-subtitle">
                                <span className="subtitle-badge">{steps[active].subtitle}</span>
                            </div>
                            
                            <div className="stage-results-list">
                                <h4 className="results-heading">Ключевые шаги:</h4>
                                {steps[active].results.map((item, idx) => (
                                    <div key={idx} className="result-item">
                                        <span className="result-bullet">✓</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="stage-details">
                                {steps[active].text}
                            </div>

                            <div className="stage-result">
                                <span className="result-badge">РЕЗУЛЬТАТ ЭТАПА</span>
                                <p>{steps[active].result} {steps[active].keyOutcome}</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    )
}