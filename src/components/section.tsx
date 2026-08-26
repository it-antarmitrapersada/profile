import { cn } from "@/lib/utils";

/**
 * Primitif halaman publik, bahasa "korporat hijau": chip pill sebagai label
 * bagian, judul ExtraBold. Pemisahan antarbagian lewat permukaan (putih vs
 * mint vs ink), bukan garis.
 */

export const Chip = ({
  children,
  onDark = false,
  className,
}: { onDark?: boolean } & React.ComponentProps<"span">) => (
  <span
    className={cn(
      "inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold",
      onDark ? "bg-white/10 text-ink-foreground" : "bg-accent text-primary",
      className,
    )}
  >
    {children}
  </span>
);

export const SectionHeading = ({
  chip,
  children,
  className,
}: { chip: string } & React.ComponentProps<"h2">) => (
  <div className={className}>
    <Chip>{chip}</Chip>
    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
      {children}
    </h2>
  </div>
);
