'use client'

import { useReveal } from '@/hooks/useReveal'

export default function Contact() {
  const { ref, className, style } = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`section contact ${className}`}
      id="contact"
      style={style}
    >
      <div className="shell contact-layout">
        <div className="contact-copy">
          <h2>Рабочая сессия по вашему ИИ-контуру</h2>
          <p>
            За 60 минут соберём проектную гипотезу: целевой процесс, KPI и
            базовый уровень, ограничения ИБ/комплаенса и план запуска первого
            сценария в промышленную эксплуатацию.
          </p>
          <ul>
            <li>Какой первый кейс выбрать, чтобы защитить инвестицию</li>
            <li>Какая архитектура пройдёт внутреннюю проверку</li>
            <li>Как перейти от кейса к портфелю без потери темпа</li>
          </ul>
        </div>

        <form
          className="lead-form"
          action="mailto:v.bakhmat@stacklevel.group"
          method="post"
          encType="text/plain"
        >
          <label>
            Имя
            <input type="text" name="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Компания
            <input type="text" name="company" />
          </label>
          <label>
            Роль
            <input type="text" name="role" placeholder="CDTO / CIO / CDO" />
          </label>
          <label className="full">
            Контур и KPI
            <textarea
              name="task"
              placeholder="Что приоритетно (база знаний/документы/риски/операции) и по какой метрике оценивать эффект"
            />
          </label>
          <button className="btn btn-blue full" type="submit">
            Отправить сообщение
          </button>
          <p className="contact-note full">
            Email:{' '}
            <a href="mailto:v.bakhmat@stacklevel.group">
              v.bakhmat@stacklevel.group
            </a>
          </p>
        </form>
      </div>
    </section>
  )
}

