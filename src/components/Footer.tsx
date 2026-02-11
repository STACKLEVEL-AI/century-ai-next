'use client'

import Image from 'next/image'
import { Mail, Phone, Globe, Send, ArrowUp, MessageCircle } from 'lucide-react'

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
              Контуры внедрения ИИ для промышленной эксплуатации в корпорациях.
          </section>

          <section className="footer-col">
            <p className="footer-title">Контакты</p>
            <div className="footer-contacts">
              <a href="mailto:v.bakhmat@stacklevel.group" className="contact-link">
                <Mail size={16} />
                <span>v.bakhmat@stacklevel.group</span>
              </a>

              <a href="tel:+375296682127" className="contact-link">
                <Phone size={16} />
                <span>+375 (29) 668-21-27</span>
              </a>

              <a
                  href="https://stacklevel.group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
              >
                <Globe size={16} />
                <span>stacklevel.group</span>
              </a>
            </div>
          </section>

          <section className="footer-col">
            <p className="footer-title">Социальные сети</p>
            <div className="footer-socials">
              <a
                  href="https://t.me/vitalibakhmat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social"
              >
                <span>Telegram</span>
                <MessageCircle size={16} />
              </a>

              <a
                  href="mailto:v.bakhmat@stacklevel.group"
                  className="social"
              >
                <span>Написать email</span>
                <Send size={16} />
              </a>

              <a
                  href="https://stacklevel.group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social"
              >
                <span>Посетить сайт</span>
                <Globe size={16} />
              </a>
            </div>
          </section>
        </div>

        <div className="shell footer-bottom">
          <p>&copy; {year} Century by Stacklevel Group.</p>
        </div>
      </footer>
  )
}