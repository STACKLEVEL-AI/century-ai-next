'use client'
import { useEffect, useRef, useState } from 'react'

export function useReveal(delay = 0) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    if (node.getBoundingClientRect().top <= window.innerHeight * 0.88) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const className = `reveal${visible ? ' is-visible' : ''}`
  const style = delay
    ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties)
    : undefined

  return { ref, visible, className, style }
}

