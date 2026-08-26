import { cn } from "@/lib/utils";

/**
 * Sistem tanda halaman publik: label mono huruf kapital + garis rambut.
 * Diambil dari penandaan dokumen izin — bisnis PBF berjalan di atas berkas
 * bernomor, jadi strukturnya mengabarkan sesuatu yang benar, bukan menghias.
 */

export const Eyebrow = ({
  children,
  className,
}: React.ComponentProps<"p">) => (
  <p
    className={cn(
      "font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase",
      className,
    )}
  >
    {children}
  </p>
);

export const SectionHeading = ({
  eyebrow,
  children,
  className,
}: { eyebrow: string } & React.ComponentProps<"h2">) => (
  <div className={cn("border-b pb-4", className)}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
      {children}
    </h2>
  </div>
);

/** Satu baris catatan: label mono di kiri, isi di kanan, dipisah garis rambut. */
export const RecordRow = ({
  label,
  children,
  className,
}: { label: string } & React.ComponentProps<"div">) => (
  <div
    className={cn(
      "grid gap-2 border-b py-5 sm:grid-cols-[9rem_1fr] sm:gap-8",
      className,
    )}
  >
    <Eyebrow className="sm:pt-1">{label}</Eyebrow>
    <div className="font-body text-[0.9375rem] leading-relaxed whitespace-pre-line">
      {children}
    </div>
  </div>
);
