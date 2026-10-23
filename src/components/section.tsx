import Link from "next/link";
import { cn, telHref } from "@/lib/utils";

/**
 * Primitif halaman publik, arah "klinis & minimal": eyebrow hijau sebagai
 * label, judul medium berspasi rapat, pemisah lewat garis tipis — tanpa
 * shadow, gradien, atau ikon dekoratif.
 */

export const Eyebrow = ({
  className,
  ...props
}: React.ComponentProps<"p">) => (
  <p className={cn("text-sm font-medium text-primary", className)} {...props} />
);

export const H2 = ({ className, ...props }: React.ComponentProps<"h2">) => (
  <h2
    className={cn(
      "text-[clamp(30px,3.4vw,40px)] leading-[1.1] font-medium tracking-[-0.02em]",
      className,
    )}
    {...props}
  />
);

export const PageHero = ({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) => (
  <section
    className={cn(
      "wrap flex flex-col gap-7 pt-[clamp(64px,10vw,120px)] pb-[clamp(56px,7vw,88px)]",
      className,
    )}
  >
    <Eyebrow className="rise">{eyebrow}</Eyebrow>
    <h1
      className="rise max-w-[960px] text-[clamp(38px,5.6vw,68px)] leading-[1.05] font-medium tracking-[-0.03em] text-balance"
      style={{ animationDelay: "60ms" }}
    >
      {title}
    </h1>
    {children && (
      <div className="rise" style={{ animationDelay: "120ms" }}>
        {children}
      </div>
    )}
  </section>
);

/** Paragraf + tombol sebaris, turun ke bawah di layar sempit. */
export const HeroAction = ({
  text,
  children,
}: {
  text: string;
  children?: React.ReactNode;
}) => (
  <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-7">
    <p className="max-w-[560px] text-[19px] leading-[1.55] text-muted-foreground">
      {text}
    </p>
    {children}
  </div>
);

export const PrimaryLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    className={cn(
      "inline-block rounded-full bg-primary px-[26px] py-4 font-medium text-primary-foreground transition-colors hover:bg-primary-hover",
      className,
    )}
  >
    {children}
  </a>
);

export const TextLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="self-start font-medium text-primary transition-colors hover:text-primary-hover"
  >
    {children} →
  </Link>
);

export const CtaBand = ({
  catalogUrl,
  phone,
}: {
  catalogUrl: string;
  phone: string;
}) => (
  <div className="wrap pb-[clamp(80px,10vw,120px)]">
    <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8 border-t border-foreground pt-14">
      <h2 className="max-w-[640px] text-[clamp(32px,4vw,48px)] leading-[1.08] font-medium tracking-[-0.025em] text-balance">
        {catalogUrl
          ? "Mulai dari katalog, atau hubungi kami langsung."
          : "Hubungi kami untuk memulai pengadaan Anda."}
      </h2>
      <div className="flex flex-col items-start gap-4">
        {catalogUrl && (
          <PrimaryLink href={catalogUrl}>Buka Katalog INAPROC ↗</PrimaryLink>
        )}
        {phone && (
          <a
            href={telHref(phone)}
            className="transition-colors hover:text-primary"
          >
            {phone}
          </a>
        )}
      </div>
    </div>
  </div>
);

/** Satu huruf per nilai — urutannya mengeja akronim, jangan diacak. */
export const ValueGrid = ({
  values,
  compact = false,
}: {
  values: { name: string; description: string }[];
  compact?: boolean;
}) => (
  // min 130px: lima kolom tetap sebaris sampai ~700px, di bawahnya
  // langsung satu kolom — tidak pernah pecah 4+1.
  <ul
    className={cn(
      "grid grid-cols-[repeat(auto-fit,minmax(min(100%,130px),1fr))]",
      !compact && "border-t",
    )}
  >
    {values.map((value) => (
      <li
        key={value.name}
        className={cn(
          "flex flex-col pr-6",
          compact ? "gap-2 pb-7" : "gap-2.5 border-b py-7",
        )}
      >
        {compact ? (
          <span className="text-lg font-semibold">
            <span className="text-primary">
              {value.name.charAt(0).toUpperCase()}
            </span>{" "}
            · {value.name}
          </span>
        ) : (
          <>
            <span
              aria-hidden
              className="text-[44px] leading-none font-medium text-primary"
            >
              {value.name.charAt(0).toUpperCase()}
            </span>
            <span className="text-lg font-semibold">{value.name}</span>
          </>
        )}
        <span className="text-[15px] leading-normal text-muted-foreground">
          {value.description}
        </span>
      </li>
    ))}
  </ul>
);

/** Pecah teks CMS per baris kosong. */
export const paragraphs = (text: string) =>
  text.split(/\n\s*\n/).filter((para) => para.trim());

// ponytail: placeholder sampai kolom `whatsapp`, `instagram_url`,
// `linkedin_url` ada di CMS — ganti nilai di sini, lalu pindahkan ke
// getProfile(). PRODUCT.md masih menyatakan WhatsApp tidak dipakai.
export const WHATSAPP = {
  label: "08xx-xxxx-xxxx",
  href: "https://wa.me/628XXXXXXXXXX",
};
export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/GANTI-USERNAME" },
  { label: "LinkedIn", href: "https://linkedin.com/company/GANTI-USERNAME" },
];
