import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";

export default async function HomePage() {
  const profile = await getProfile();

  // Beranda memakai ulang `about` yang sama, dipotong di batas kalimat —
  // tidak ada field khusus beranda yang harus diisi terpisah oleh admin.
  const summary =
    profile.about.length > 280
      ? `${profile.about.slice(0, 280).replace(/\s+\S*$/, "")}…`
      : profile.about;

  return (
    <>
      <section className="relative isolate">
        <Image
          src="/warehouse.jpg"
          alt=""
          width={1920}
          height={1080}
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[0.35]"
        />
        <div className="mx-auto max-w-5xl px-6 py-28 text-white sm:py-36">
          <h1 className="max-w-2xl text-4xl font-bold text-balance sm:text-5xl">
            PT. Antar Mitra Persada
          </h1>
          <p className="mt-4 max-w-xl text-lg text-pretty text-white/80">
            {profile.vision || "Mitra distribusi tepercaya bagi jaringan Anda."}
          </p>
          <Link
            href="/about"
            className={buttonVariants({ size: "lg", className: "mt-8" })}
          >
            Tentang Kami
          </Link>
        </div>
      </section>

      {summary && (
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-semibold">Sekilas Perusahaan</h2>
          <p className="mt-4 max-w-3xl text-pretty whitespace-pre-line text-muted-foreground">
            {summary}
          </p>
          <Link
            href="/about"
            className="mt-4 inline-block text-sm font-medium underline underline-offset-4"
          >
            Selengkapnya
          </Link>
        </section>
      )}

      <section className="border-t bg-muted/40">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 py-12 sm:grid-cols-3">
          {[
            { icon: MapPin, label: "Alamat", value: profile.address },
            { icon: Phone, label: "Telepon", value: profile.phone },
            { icon: Mail, label: "Email", value: profile.email },
          ]
            .filter((item) => item.value)
            .map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-sm whitespace-pre-line text-muted-foreground">
                    {value}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
