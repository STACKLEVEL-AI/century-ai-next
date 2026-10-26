import TelegramLink from "./TelegramLink";

export default function Contact() {
  return (
    <section
      className="section contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="shell contact-panel">
        <div>
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Talk to Vitali
          </p>
          <h2 id="contact-title">
            Let&apos;s find your
            <br /> first AI workflow.
          </h2>
          <p>
            Tell Vitali which process you want to improve, where the relevant
            information lives and what a useful outcome would look like.
          </p>
        </div>
        <div className="contact-action">
          <TelegramLink />
          <p>You will open a conversation with Vitali Bakhmat on Telegram.</p>
        </div>
      </div>
    </section>
  );
}
