'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { SOURCE_DATA, WORKFLOW_DATA } from '@/lib/data'

type DrawerState =
  | { type: 'workflow'; id: string }
  | { type: 'source'; id: string }
  | null

export default function Drawers() {
  const [drawer, setDrawer] = useState<DrawerState>(null)
  const [isOpen, setIsOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<Element | null>(null)

  const prefersReduced =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const close = useCallback(() => {
    setIsOpen(false)
    setTimeout(
      () => {
        setDrawer(null)
        if (lastFocused.current && 'focus' in lastFocused.current) {
          ;(lastFocused.current as HTMLElement).focus()
        }
      },
      prefersReduced ? 0 : 180
    )
  }, [prefersReduced])

  const open = useCallback(
    (state: DrawerState) => {
      lastFocused.current = document.activeElement
      setDrawer(state)
      requestAnimationFrame(() => {
        setIsOpen(true)
        setTimeout(() => closeRef.current?.focus(), 50)
      })
    },
    []
  )

  /* Listen for custom events from other components */
  useEffect(() => {
    const onWorkflow = (e: Event) => {
      const agentId = (e as CustomEvent).detail as string
      if (WORKFLOW_DATA[agentId]) open({ type: 'workflow', id: agentId })
    }
    const onSource = (e: Event) => {
      const sourceId = (e as CustomEvent).detail as string
      if (SOURCE_DATA[sourceId]) open({ type: 'source', id: sourceId })
    }
    window.addEventListener('openWorkflowDrawer', onWorkflow)
    window.addEventListener('openSourceDrawer', onSource)
    return () => {
      window.removeEventListener('openWorkflowDrawer', onWorkflow)
      window.removeEventListener('openSourceDrawer', onSource)
    }
  }, [open])

  /* Escape key */
  useEffect(() => {
    if (!drawer) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [drawer, close])

  if (!drawer) return null

  const isWorkflow = drawer.type === 'workflow'
  const data = isWorkflow
    ? WORKFLOW_DATA[drawer.id]
    : SOURCE_DATA[drawer.id]
  if (!data) return null

  return (
    <>
      <div
        className="drawer-backdrop"
        onClick={close}
        style={{ display: 'block' }}
      />
      <aside
        className={`side-drawer${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={isWorkflow ? 'Сценарий' : 'Источник'}
        style={{ display: 'grid' }}
      >
        <header className="side-drawer-head">
          <h3>
            {isWorkflow ? (data as typeof WORKFLOW_DATA[string]).title : (data as typeof SOURCE_DATA[string]).title}
          </h3>
          <button
            className="drawer-close"
            type="button"
            ref={closeRef}
            onClick={close}
            aria-label="Закрыть"
          >
            Закрыть
          </button>
        </header>

        <div className="side-drawer-body">
          {isWorkflow ? (
            <>
              <p>{(data as typeof WORKFLOW_DATA[string]).summary}</p>
              <ol className="workflow-steps">
                {(data as typeof WORKFLOW_DATA[string]).steps.map(
                  (step, i) => (
                    <li key={i}>
                      <strong>Шаг {i + 1}</strong>
                      {step}
                    </li>
                  )
                )}
              </ol>
            </>
          ) : (
            <>
              <div className="drawer-meta">
                <p>Источник</p>
                <span>{(data as typeof SOURCE_DATA[string]).location}</span>
              </div>
              <p>{(data as typeof SOURCE_DATA[string]).snippet}</p>
            </>
          )}
        </div>
      </aside>
    </>
  )
}

