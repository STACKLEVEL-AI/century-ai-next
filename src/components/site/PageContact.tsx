import TelegramLink from "@/components/TelegramLink";

export default function PageContact() {
  return <section className="inner-contact" id="contact" aria-labelledby="inner-contact-title">
    <div className="shell inner-contact-layout">
      <div className="inner-contact-copy">
        <h2 id="inner-contact-title">A better way to work</h2>
        <p>Bring us a process you want to improve. We’ll explore the information, the people and the next step together</p>
      </div>
      <div className="inner-contact-action">
        <TelegramLink className="btn btn-primary">Message Vitali on Telegram</TelegramLink>
      </div>
    </div>
  </section>;
}
