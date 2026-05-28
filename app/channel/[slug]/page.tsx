import { notFound } from "next/navigation";
import {
  getAllChannels,
  getChannelBySlug,
  getNextChannel,
  getPreviousChannel,
} from "@/lib/channels";
import ChannelPlayer from "@/components/ChannelPlayer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllChannels().map((ch) => ({ slug: ch.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const channel = getChannelBySlug(slug);
  if (!channel) return {};
  return {
    title: `${channel.emoji} ${channel.name} — RetroSportTV.ge`,
    description: channel.description,
  };
}

export default async function ChannelPage({ params }: Props) {
  const { slug } = await params;
  const channel = getChannelBySlug(slug);
  if (!channel) notFound();

  return (
    <ChannelPlayer
      channel={channel}
      prevChannel={getPreviousChannel(channel.slug)}
      nextChannel={getNextChannel(channel.slug)}
    />
  );
}
