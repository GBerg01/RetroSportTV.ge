import type { CSSProperties } from "react";
import Link from "next/link";
import ChannelLogo from "@/components/ChannelLogo";
import { getChannelArt } from "@/lib/channelArt";
import type { Channel, ChannelCategory } from "@/lib/channels";

type Props = {
  channel: Channel;
  featuredClipTitle?: string;
};

const CHANNEL_TYPE_LABELS: Partial<Record<ChannelCategory, string>> = {
  PLAYERS: "PLAYER CHANNEL",
  ERAS: "ERA CHANNEL",
  TEAMS: "TEAM CHANNEL",
  CHAOS: "CHAOS FEED",
  CLASSICS: "CLASSIC FEED",
  COLLEGE: "COLLEGE CHANNEL",
  GOLF: "GOLF CHANNEL",
  MULTI_SPORT: "MULTI-SPORT FEED",
};

function getPrimaryCategory(channel: Channel): ChannelCategory | undefined {
  return channel.categories?.[0] ?? channel.category;
}

function getChannelType(channel: Channel) {
  const category = getPrimaryCategory(channel);
  return category ? CHANNEL_TYPE_LABELS[category] ?? `${category} CHANNEL` : "SPORTS CHANNEL";
}

function getFeedBadge(channel: Channel) {
  const category = getPrimaryCategory(channel);
  if (category === "CLASSICS" || channel.categories?.includes("CLASSICS")) return "CLASSIC FEED";
  if (category === "COLLEGE" || channel.categories?.includes("COLLEGE")) return "CLASSIC FEED";
  if (category === "TEAMS") return "TEAM LOCKED";
  return "LIVE ARCHIVE";
}

function DetailRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] py-2 last:border-b-0">
      <span className="text-[10px] tracking-[0.28em] text-[#3f3f3f]">{label}</span>
      <span
        className="max-w-[58%] truncate text-right text-[13px] tracking-widest uppercase"
        style={{ color: accent }}
      >
        {value}
      </span>
    </div>
  );
}

export default function ChannelProfileCard({ channel, featuredClipTitle }: Props) {
  const art = getChannelArt(channel);
  const channelType = getChannelType(channel);
  const feedBadge = getFeedBadge(channel);
  const signalLabel = channel.videos.length > 0 ? "SIGNAL STRONG" : "SIGNAL PENDING";
  const badges = Array.from(new Set([feedBadge, signalLabel, channelType]));
  const hasProfileArt = Boolean(art.profileBackgroundUrl);

  return (
    <section
      className="relative mt-4 flex min-h-0 flex-1 flex-col overflow-hidden border bg-[#080808] p-4"
      style={{
        borderColor: `${art.accent}32`,
        background: [
          art.profileBackgroundUrl
            ? `linear-gradient(135deg, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.42) 48%, rgba(8,8,8,0.20) 100%), url(${art.profileBackgroundUrl})`
            : null,
          `radial-gradient(circle at 84% 8%, ${art.secondaryAccent}24, transparent 32%)`,
          `linear-gradient(135deg, ${art.accent}18 0%, rgba(8,8,8,0.95) 38%, rgba(8,8,8,0.86) 100%)`,
          art.texture,
          "#080808",
        ]
          .filter(Boolean)
          .join(", "),
        backgroundSize: hasProfileArt ? "cover, auto, auto, auto, auto" : undefined,
        backgroundPosition: hasProfileArt ? "center" : undefined,
        boxShadow: `inset 0 0 30px rgba(0,0,0,0.72), 0 0 24px ${art.accent}0d`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-5 top-8 select-none text-[86px] leading-none opacity-[0.08]"
        style={{ color: art.secondaryAccent }}
      >
        {art.graphicLabel}
      </div>

      <div className="relative flex items-start gap-3">
        <div
          className="flex h-16 w-16 flex-shrink-0 items-center justify-center border bg-black/30 text-4xl"
          style={{
            borderColor: `${art.secondaryAccent}48`,
            boxShadow: `inset 0 0 18px ${art.accent}18`,
          }}
        >
          <ChannelLogo channel={channel} className="max-h-10 max-w-10 text-4xl leading-none" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="border px-2 py-0.5 text-[10px] tracking-[0.22em]"
              style={{ borderColor: `${art.accent}55`, color: art.accent }}
            >
              CH {channel.channelNumber}
            </span>
            <span className="truncate text-[10px] tracking-[0.24em] text-[#555]">
              {channelType}
            </span>
          </div>
          <h2
            className="mt-2 truncate text-3xl leading-none tracking-wide xl:text-[34px]"
            style={{
              color: "#f4f4f4",
              textShadow: `0 0 16px ${art.accent}55`,
            }}
          >
            {channel.name}
          </h2>
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            className="border bg-black/24 px-2 py-1 text-[10px] tracking-[0.2em]"
            style={{
              borderColor: `${art.accent}35`,
              color: badge === signalLabel ? art.secondaryAccent : "#7a7a7a",
            }}
          >
            {badge}
          </span>
        ))}
      </div>

      <p className="relative mt-4 line-clamp-4 text-sm leading-relaxed text-[#9a9a9a]">
        {channel.description}
      </p>

      <div className="relative mt-4 border border-white/[0.06] bg-black/24 px-3">
        <DetailRow label="CHANNEL TYPE" value={channelType} accent={art.secondaryAccent} />
        <DetailRow label="ERA" value={channel.era} accent={art.accent} />
        <DetailRow label="SPORT" value={channel.sport} accent={art.accent} />
        <DetailRow label="SIGNAL" value={signalLabel} accent={art.secondaryAccent} />
      </div>

      <div className="relative mt-auto pt-4">
        <div className="mb-4 border border-white/[0.06] bg-black/20 p-3">
          <p className="mb-1 text-[10px] tracking-[0.32em] text-[#3d3d3d]">FEATURED CLIP</p>
          <p className="truncate text-sm tracking-wide text-[#858585]">
            {featuredClipTitle ?? "SIGNAL PENDING"}
          </p>
        </div>

        <Link
          href={`/channel/${channel.slug}`}
          className="accent-btn block border py-3 text-center text-base tracking-[0.28em]"
          style={{ "--btn-accent": art.accent } as CSSProperties}
        >
          ▶ TUNE IN
        </Link>
      </div>
    </section>
  );
}
