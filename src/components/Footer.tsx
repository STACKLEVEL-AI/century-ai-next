'use client'

import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <section className="footer-brand">
          <a
            href="#home"
            className="footer-logo"
            aria-label="Century by Stacklevel Group"
          >
            <span className="footer-century">CENTURY</span>
            <span className="footer-line">
              <Image
                className="footer-stacklevel"
                src="/assets/sl.svg"
                alt="Stacklevel"
                width={277}
                height={23}
              />
              <span className="footer-group">GROUP</span>
            </span>
          </a>
        </section>

        <section className="footer-col">
          <p className="footer-title">Контакты</p>
          <a href="mailto:v.bakhmat@stacklevel.group">
            v.bakhmat@stacklevel.group
          </a>
          <a
            href="https://t.me/vitalibakhmat"
            target="_blank"
            rel="noopener noreferrer"
          >
            @vitalibakhmat
          </a>
          <a
            href="https://stacklevel.group"
            target="_blank"
            rel="noopener noreferrer"
          >
            stacklevel.group
          </a>
        </section>

        <section className="footer-col">
          <p className="footer-title">На связи</p>
          <div className="footer-socials">
            <a
              href="https://t.me/vitalibakhmat"
              target="_blank"
              rel="noopener noreferrer"
            >
              Телеграм
            </a>
            <a href="mailto:v.bakhmat@stacklevel.group">Email</a>
            <a
              href="https://stacklevel.group"
              target="_blank"
              rel="noopener noreferrer"
            >
              Сайт
            </a>
          </div>
          <p className="footer-note">
            Контуры внедрения ИИ для промышленной эксплуатации в корпорациях.
          </p>
        </section>
      </div>

      <div className="shell footer-bottom">
        <p>&copy; {year} Century by Stacklevel Group</p>
        <a href="#home">Наверх</a>
      </div>
    </footer>
  )
}

