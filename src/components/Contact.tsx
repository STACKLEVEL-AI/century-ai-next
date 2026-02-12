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
          <div className="field">
            <input type="text" name="name" id="name" required placeholder="" />
            <label htmlFor="name">Имя</label>
          </div>
          <div className="field">
            <input type="email" name="email" id="email" required placeholder="" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="field">
            <input type="text" name="company" id="company" placeholder="" />
            <label htmlFor="company">Компания</label>
          </div>
          <div className="field">
            <input type="text" name="role" id="role" placeholder="" />
            <label htmlFor="role">Роль</label>
          </div>
          <div className="field full">
            <textarea name="task" id="task" placeholder="" />
            <label htmlFor="task">Контур и KPI</label>
          </div>
          <button className="btn btn-blue full" type="submit">
            Отправить сообщение
          </button>
        </form>
      </div>
    </section>
  )
}