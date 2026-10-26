import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { TELEGRAM_URL } from "@/lib/site";

type TelegramLinkProps = {
  children?: ReactNode;
  className?: string;
};

export default function TelegramLink({
  children = "Message Vitali on Telegram",
  className = "btn btn-primary",
}: TelegramLinkProps) {
  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      referrerPolicy="no-referrer"
      className={className}
    >
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
