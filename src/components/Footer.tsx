'use client'

import Image from 'next/image'
import { Mail, Phone, Globe, Send } from 'lucide-react'
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
                  src="assets/sl.svg"
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
                <Send size={16} />
                <span>Telegram</span>
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
            <p className="footer-title">QR-код</p>
            <div className="footer-qr">
              <Image
                  src="assets/qr-code.png"
                  alt="QR-код для связи"
                  width={120}
                  height={120}
                  className="qr-image"
              />
            </div>
          </section>
        </div>

        <div className="footer-big-century">
          <p>CENTURY</p>
        </div>

        <div className="shell footer-bottom">
          <p>&copy; {year} Century by Stacklevel Group.</p>
        </div>
      </footer>
  )
}