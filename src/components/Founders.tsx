import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { EGOR_PROFILE_URL, VADIM_PROFILE_URL } from "@/lib/site";
import TelegramLink from "./TelegramLink";

type TeamMember = {
  name: string;
  role: string;
  description: string;
  image: string;
  height: number;
  profileUrl?: string;
  profileLabel?: string;
};

const team: TeamMember[] = [
  {
    name: "Vitali Bakhmat",
    role: "Co-founder · CEO",
    description: "Business development and customer partnerships.",
    image: "/founders/vitali-bakhmat.webp",
    height: 400,
  },
  {
    name: "Vadim Vladymtsev",
    role: "Co-founder · CTO",
    description: "Enterprise AI architecture and engineering.",
    image: "/founders/vadim-vladymtsev.webp",
    height: 213,
    profileUrl: VADIM_PROFILE_URL,
    profileLabel: "vadimohka.com",
  },
  {
    name: "Egor Krychev",
    role: "Co-founder · CAIO",
    description: "AI automation, agents and business processes.",
    image: "/founders/egor-krychev.webp",
    height: 320,
    profileUrl: EGOR_PROFILE_URL,
    profileLabel: "LinkedIn",
  },
];

export default function Founders() {
  return (
    <section
      className="section founders-section"
      id="founders"
      aria-labelledby="founders-title"
    >
      <div className="shell">
        <div className="founders-heading">
          <h2 id="founders-title">Founders</h2>
        </div>
        <div className="founders-grid">
          {team.map(
            ({
              name,
              role,
              description,
              image,
              height,
              profileUrl,
              profileLabel,
            }) => (
              <article className="founder-card" key={name}>
                <div className="founder-photo">
                  <Image
                    src={image}
                    alt={name}
                    width={320}
                    height={height}
                    sizes="64px"
                  />
                </div>
                <div className="founder-copy">
                  <h3>
                    {profileUrl ? (
                      <a
                        href={profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                      >
                        {name}
                      </a>
                    ) : (
                      name
                    )}
                  </h3>
                  <p className="founder-role">{role}</p>
                  <p className="founder-description">{description}</p>
                  {profileUrl ? (
                    <a
                      className="founder-link"
                      href={profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                    >
                      {profileLabel}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ) : (
                    <TelegramLink className="founder-link">
                      Telegram
                    </TelegramLink>
                  )}
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
