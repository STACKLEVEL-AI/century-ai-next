'use client'

import { useReveal } from '@/hooks/useReveal'

const hooks = [
  {
    num: '01',
    title: 'Нет владельца и измеримой экономики',
    text: 'Без владельца, KPI и базового уровня пилот не проходит инвесткомитет и остаётся демонстрацией.',
    result: 'Результат: эффект фиксируется в цифрах и KPI.',
  },
  {
    num: '02',
    title: 'ИБ и комплаенс подключаются слишком поздно',
    text: 'Без защищённого контура и журнала аудита инициативу останавливают на этапе проверки.',
    result: 'Результат: контроль встроен в архитектуру, а не добавлен в конце.',
  },
  {
    num: '03',
    title: 'Нет механики масштабирования',
    text: 'Один успешный кейс не превращается в портфель без модели управления и стандарта тиражирования.',
    result: 'Результат: дорожная карта с ролями, стандартами качества и ритмом внедрения.',
  },
]

export default function HooksSection() {
  const { ref, className, style } = useReveal(70)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`section hooks ${className}`}
      id="why-now"
      style={style}
    >
      <div className="shell section-head">
        <h2>Почему пилот ИИ не становится управленческим решением</h2>
        <p>
          В большинстве крупных организаций дело не в качестве модели. Не хватает
          связки: экономика кейса, контроль рисков и операционный стандарт
          масштабирования.
        </p>
      </div>

      <div className="shell hook-grid">
        {hooks.map((h) => (
          <article className="hook-card" key={h.num}>
            <p className="hook-num">{h.num}</p>
            <h3>{h.title}</h3>
            <p>{h.text}</p>
            <span>{h.result}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

