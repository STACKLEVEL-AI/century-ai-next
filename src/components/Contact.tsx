import TelegramLink from "./TelegramLink";

export default function Contact() {
  return (
    <section
      className="section contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="shell contact-panel">
        <div className="contact-copy">
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Start a conversation
          </p>
          <h2 id="contact-title">
            Your next chapter
            <br /> starts with one workflow.
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
