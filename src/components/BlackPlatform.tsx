'use client'

import { useReveal } from '@/hooks/useReveal'

const features = [
  {
    num: '01',
    title: 'Безопасность и развёртывание',
    text: 'Разворачивается локально или в изолированном контуре. Данные не покидают периметр, а правила доступа и политики ИБ учитываются в процессе.',
    effect: 'Эффект: снижает риск утечек и блокировок со стороны ИБ.',
  },
  {
    num: '02',
    title: 'Точность и верификация',
    text: 'Гибридный RAG по корпоративным документам и ответы с цитатами источников — чтобы можно было проверять факты.',
    effect: 'Эффект: меньше ошибок и «галлюцинаций», выше доверие.',
  },
  {
    num: '03',
    title: 'Мониторинг и аудит',
    text: 'Логирование запросов и ответов, наблюдаемость, контроль качества и воспроизводимость — база для внутреннего контроля и подготовки к аудиту.',
    effect: 'Эффект: управляемый продакшен и доказательная база.',
  },
  {
    num: '04',
    title: 'Скорость и независимость',
    text: 'OpenAI\u2011совместимый API и сменяемые компоненты снижают вендорскую зависимость и ускоряют интеграции. Прозрачная экономика и масштабирование на портфель.',
    effect: 'Эффект: быстрее вывод в эксплуатацию и прогнозируемый бюджет.',
  },
]

export default function BlackPlatform() {
  const { ref, className, style } = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`section black-platform ${className}`}
      id="motion"
      style={style}
    >
      <div className="shell black-accent">
        <div className="black-accent-top">
          <h2>
            Century —<br />
            платформа<br />
            безопасного<br />
            внедрения LLM
          </h2>
          <p>
            Единый конвейер для создания и запуска LLM&#8209;сервисов в корпорации:
            внутри периметра (on&#8209;prem/air&#8209;gapped) или гибридно. Встроенный
            контроль качества, аудит и верификация ответов превращают пилот в
            масштабируемый стандарт.
          </p>
        </div>
        <div className="black-accent-grid">
          {features.map((f) => (
            <article key={f.num}>
              <p>{f.num}</p>
              <h3>{f.title}</h3>
              <span>{f.text}</span>
              <strong>{f.effect}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

