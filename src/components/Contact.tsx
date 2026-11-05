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
          <h2 id="contact-title">Start with one process</h2>
          <p>
            Tell Vitali which process you want to improve, where the relevant
            information lives and what a useful outcome would look like
          </p>
        </div>
        <div className="contact-action">
          <TelegramLink className="btn btn-light" />
        </div>
      </div>
    </section>
  );
}
