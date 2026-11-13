import type { ContactChannel } from "@/types/content";
import { ChatIcon, ClockIcon } from "@/components/ui";

const icons = {
  chat: <ChatIcon />,
  clock: <ClockIcon />,
} as const;

export function ContactInfoCard({ channel }: { channel: ContactChannel }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-surface-warm p-4 sm:p-5">
      <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
        {icons[channel.icon]}
      </span>
      <div className="flex min-w-0 flex-col gap-1 text-body">
        <span className="text-ink">{channel.label}</span>
        {channel.href ? (
          <a href={channel.href} className="w-fit text-brand underline-offset-4 hover:underline">
            {channel.value}
          </a>
        ) : (
          <span className="text-ink-tertiary">{channel.value}</span>
        )}
      </div>
    </div>
  );
}
