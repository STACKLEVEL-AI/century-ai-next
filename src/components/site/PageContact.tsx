import TelegramLink from "@/components/TelegramLink";

export default function PageContact() {
  return <section className="inner-contact" id="contact" aria-labelledby="inner-contact-title">
    <div className="shell inner-contact-layout">
      <div>
        <p className="eyebrow"><span aria-hidden="true" />Let’s make it useful</p>
        <h2 id="inner-contact-title">A better way to work.<br /><span>Starting with yours.</span></h2>
      </div>
      <div className="inner-contact-action">
        <p>Bring us a process you want to improve. We’ll explore the information, the people and the next step together.</p>
        <TelegramLink className="btn btn-primary">Message Vitali on Telegram</TelegramLink>
        <small>A direct conversation with Vitali Bakhmat.</small>
      </div>
    </div>
  </section>;
}
