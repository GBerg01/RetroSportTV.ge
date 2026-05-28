import type { Channel } from "@/lib/channels";

type Props = {
  channel: Pick<Channel, "name" | "emoji" | "logoUrl">;
  className?: string;
};

// Single swap point for channel icons.
// Set channel.logoUrl in data/channels.ts to use an image/SVG/badge instead of emoji.
export default function ChannelLogo({ channel, className = "" }: Props) {
  if (channel.logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={channel.logoUrl}
        alt={channel.name}
        className={className}
        style={{ objectFit: "contain" }}
      />
    );
  }
  return <span className={className}>{channel.emoji}</span>;
}
