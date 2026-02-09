'use client'

import { useState, useCallback } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface Agent {
  id: string
  title: string
  text: string
  badges: string[]
}

interface TabData {
  key: string
  label: string
  title: string
  intro: string
  agents: Agent[]
  metric: string
}

const tabs: TabData[] = [
  {
    key: 'retail',
    label: 'База знаний',
    title: 'База знаний и поддержка',
    intro: 'Галерея агентов для помощи сотрудникам: от быстрых ответов по регламентам до триажа обращений.',
    agents: [
      { id: 'policy-knowledge', title: 'Агент знаний по политикам', text: 'Отвечает по внутренним регламентам с обязательной ссылкой на источник.', badges: ['RAG', 'Цитаты', 'IAM'] },
      { id: 'support-triage', title: 'Агент триажа поддержки', text: 'Классифицирует обращения, формирует черновик ответа и маршрут в ITSM.', badges: ['RAG', 'Аудит', 'ITSM'] },
      { id: 'onboarding-copilot', title: 'Агент онбординга', text: 'Подсказывает шаги онбординга и учебные материалы в контексте роли сотрудника.', badges: ['RAG', 'Цитаты', 'Доступ'] },
    ],
    metric: 'Время решения обращений, нагрузка на поддержку, качество ответов.',
  },
  {
    key: 'corp',
    label: 'Документы',
    title: 'Документы: продажи, юристы, закупки',
    intro: 'Набор агентов для документных потоков: создавать, проверять, согласовывать и фиксировать аргументацию.',
    agents: [
      { id: 'contract-risk', title: 'Агент рисков договора', text: 'Извлекает условия, рисковые пункты и отклонения от типовых шаблонов.', badges: ['RAG', 'Цитаты', 'Аудит'] },
      { id: 'tender-summary', title: 'Агент резюме тендера', text: 'Собирает резюме тендера с сопоставлением требований, рисков и дедлайнов.', badges: ['RAG', 'Цитаты', 'IAM'] },
      { id: 'sales-drafter', title: 'Агент коммерческих предложений', text: 'Готовит черновик КП и проверяет, что формулировки соответствуют политике компании.', badges: ['Политики', 'Аудит', 'CRM'] },
    ],
    metric: 'Скорость подготовки, качество документов, время до решения.',
  },
  {
    key: 'risk',
    label: 'Риски / комплаенс',
    title: 'Риски / комплаенс',
    intro: 'Агенты комплаенса и аудита для постоянного контроля рисков и воспроизводимых доказательств.',
    agents: [
      { id: 'compliance-monitor', title: 'Агент контроля политик', text: 'Проверяет ответы на соответствие ПДн, коммерческой тайне и отраслевым правилам.', badges: ['Политики', 'IAM', 'Аудит'] },
      { id: 'audit-evidence', title: 'Агент доказательств для аудита', text: 'Формирует доказательную цепочку: вопрос, ответ, цитаты, версия политики и исполнитель.', badges: ['Цитаты', 'Аудит', 'RAG'] },
      { id: 'incident-narrative', title: 'Агент отчёта по инцидентам', text: 'Собирает картину инцидента из SIEM/ITSM и готовит отчёт для риск-офиса.', badges: ['SIEM', 'ITSM', 'Аудит'] },
    ],
    metric: 'Стоимость ошибки, длительность аудита, число инцидентов.',
  },
  {
    key: 'ops',
    label: 'Операции',
    title: 'Операции',
    intro: 'Операционная галерея агентов для входящих потоков, контроля SLA и управленческой аналитики.',
    agents: [
      { id: 'operations-intake', title: 'Агент входящего потока операций', text: 'Извлекает данные из PDF/DOCX, валидирует поля и передаёт в целевой процесс.', badges: ['RAG', 'Аудит', 'DWH'] },
      { id: 'sla-control', title: 'Агент контроля SLA', text: 'Отслеживает отклонения SLA, предлагает действие и фиксирует управленческий след.', badges: ['ITSM', 'IAM', 'Аудит'] },
      { id: 'report-qa', title: 'Агент ответов по отчётам', text: 'Даёт ответы по отчётам и метрикам из DWH с обязательным источником и временем среза.', badges: ['Цитаты', 'DWH', 'Доступ'] },
    ],
    metric: 'Время цикла, доля автоматизации, соблюдение SLA.',
  },
]

export default function Scenarios() {
  const { ref, className, style } = useReveal(280)
  const [activeTab, setActiveTab] = useState('retail')

  const openWorkflow = useCallback((agentId: string) => {
    window.dispatchEvent(
      new CustomEvent('openWorkflowDrawer', { detail: agentId })
    )
  }, [])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`section scenarios ${className}`}
      id="scenarios"
      style={style}
    >
      <div className="shell section-head">
        <h2>Сценарии первых 90 дней</h2>
        <p>
          Выберите направление — получите примеры сценариев, метрики эффекта и
          формат контроля качества.
        </p>
      </div>

      <div
        className="shell scenario-tabs"
        role="tablist"
        aria-label="Сценарии внедрения"
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`tab-btn${activeTab === t.key ? ' is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={activeTab === t.key}
            aria-controls={`panel-${t.key}`}
            tabIndex={activeTab === t.key ? 0 : -1}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="shell scenario-panels">
        {tabs.map((t) => (
          <article
            key={t.key}
            className={`scenario-panel${activeTab === t.key ? ' is-active' : ''}`}
            id={`panel-${t.key}`}
            role="tabpanel"
            hidden={activeTab !== t.key}
          >
            <div className="scenario-main">
              <h3>{t.title}</h3>
              <p className="scenario-intro">{t.intro}</p>

              <div className="agent-grid">
                {t.agents.map((a) => (
                  <article className="agent-card" key={a.id}>
                    <p className="agent-kicker">Агент</p>
                    <h4>{a.title}</h4>
                    <p>{a.text}</p>
                    <ul
                      className="agent-badges"
                      aria-label="Функции агента"
                    >
                      {a.badges.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <button
                      className="agent-workflow-btn"
                      type="button"
                      onClick={() => openWorkflow(a.id)}
                    >
                      Сценарий
                    </button>
                  </article>
                ))}
              </div>
            </div>
            <aside className="scenario-aside">
              <p>Метрики эффекта</p>
              <span>{t.metric}</span>
            </aside>
          </article>
        ))}
      </div>

      <div
        className="shell build-share-run"
        aria-label="Цикл работы с агентами"
      >
        <article>
          <p>Создать</p>
          <span>Собираем агента из кейса, данных, ролей и KPI.</span>
        </article>
        <article>
          <p>Поделиться</p>
          <span>Публикуем шаблон для бизнеса, ИТ, ИБ и риск-офиса.</span>
        </article>
        <article>
          <p>Запустить</p>
          <span>
            Запускаем в рабочем контуре с аудитом и метриками эффекта.
          </span>
        </article>
      </div>
    </section>
  )
}

