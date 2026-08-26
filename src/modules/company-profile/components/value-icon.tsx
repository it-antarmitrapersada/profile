import {
  Award,
  Handshake,
  Heart,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";

/**
 * Peta eksplisit nama → ikon. Sengaja tidak dynamic-import seluruh
 * lucide-react: itu menarik ribuan ikon ke bundle demi belasan yang dipakai.
 * Tambah ikon = tambah satu baris di sini.
 */
const ICONS = {
  award: Award,
  handshake: Handshake,
  heart: Heart,
  lightbulb: Lightbulb,
  shield: ShieldCheck,
  sparkles: Sparkles,
  target: Target,
  trending: TrendingUp,
  truck: Truck,
  users: Users,
} as const;

export const ICON_NAMES = Object.keys(ICONS) as (keyof typeof ICONS)[];

export const ValueIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const Icon = ICONS[name as keyof typeof ICONS] ?? Sparkles;
  return <Icon className={className} aria-hidden />;
};
