'use client'

import {useReveal} from '@/hooks/useReveal'
import {useRef, useState} from "react";

export default function Contact() {
    const {ref, className, style} = useReveal()
    const formRef = useRef<HTMLFormElement>(null)
    const [status, setStatus] = useState<boolean>(false)

    const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!
    const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID!

    const sendToTelegram = async (formData: FormData) => {
        const name = formData.get('user_name')
        const email = formData.get('user_email')
        const company = formData.get('user_company') || 'не указана'
        const role = formData.get('user_role') || 'не указана'
        const message = formData.get('message')

        const text = `
            <b>Новая заявка с сайта Century AI!</b>
            <b>Имя:</b> ${name}
            <b>Email:</b> ${email}
            <b>Компания:</b> ${company}
            <b>Роль:</b> ${role}
            <b>Задача:</b> ${message}
            <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
                `.trim()

        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                chat_id: parseInt(CHAT_ID), 
                text: text,
                parse_mode: 'HTML'
            })
        })

        return response.ok
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const formData = new FormData(formRef.current!)
            const success = await sendToTelegram(formData)

            if (success) {
                formRef.current?.reset()
                setStatus(true)
                setTimeout(() => setStatus(false), 3000)
            } 
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section
            ref={ref as React.RefObject<HTMLElement>}
            className={`section contact ${className}`}
            id="contact"
            style={style}
        >
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

                <form ref={formRef} onSubmit={handleSubmit} className="lead-form">
                    <div className="field">
                        <input type="text" name="user_name" id="name" required placeholder=""/>
                        <label htmlFor="name">Имя</label>
                    </div>
                    <div className="field">
                        <input type="email" name="user_email" id="email" required placeholder=""/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="field">
                        <input type="text" name="user_company" id="company" placeholder=""/>
                        <label htmlFor="company">Компания</label>
                    </div>
                    <div className="field">
                        <input type="text" name="user_role" id="role" placeholder=""/>
                        <label htmlFor="role">Роль</label>
                    </div>
                    <div className="field full">
                        <textarea name="message" id="task" placeholder=""/>
                        <label htmlFor="task">Контур и KPI</label>
                    </div>
                    <button className="btn btn-blue full" type="submit">
                        Отправить сообщение
                    </button>
                    {status ? <ul className="phase-results">
                        <li>Сообщение отправлено</li>
                    </ul> : null }
                </form>
            </div>
            
        </section>
    )
}