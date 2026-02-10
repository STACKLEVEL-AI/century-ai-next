const items = [
  'CDTO (цифровая трансформация)',
  'CIO (архитектура и ИТ)',
  'CDO (данные и ИИ)',
  'Информационная безопасность',
  'Риск-офис',
  'Комплаенс',
  'Внутренний аудит',
  'Бизнес-владельцы',
]

export default function Stakeholders() {
  return (
    <section
      className="stakeholders"
      aria-label="Ключевые участники программы"
    >
      <div className="shell stakeholders-inner">
        <p>Ключевые участники</p>
        <div className="stakeholders-marquee">
          <div className="stakeholders-track">
            {[...items, ...items].map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}