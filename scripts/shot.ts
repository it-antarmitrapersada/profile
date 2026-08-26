/**
 * Screenshot halaman publik untuk pemeriksaan tampilan.
 *
 *   bun run shot                    # semua halaman, desktop + mobile
 *   bun run shot / /services        # halaman tertentu saja
 *
 * Butuh server jalan lebih dulu (bun run start / bun dev), lalu SHOT_BASE
 * kalau portnya bukan 3111.
 *
 * fullPage menangkap seluruh dokumen tanpa mengubah tinggi viewport, jadi
 * bagian setinggi layar (min-h-svh) tetap seukuran layar sungguhan —
 * `chromium --screenshot` tidak bisa begitu.
 */
import { chromium, type Browser } from "playwright";

const BASE = process.env.SHOT_BASE ?? "http://localhost:3111";
const OUT = process.env.SHOT_OUT ?? "shots";

const VIEWPORTS = {
  desktop: { width: 1280, height: 860 },
  mobile: { width: 390, height: 844 },
} as const;

const routes = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["/", "/services", "/about", "/contact"];

const nameOf = (route: string) =>
  route === "/" ? "beranda" : route.replace(/^\//, "").replace(/\//g, "-");

let browser: Browser | undefined;
try {
  browser = await chromium.launch();

  for (const [label, viewport] of Object.entries(VIEWPORTS)) {
    // reducedMotion: animasi langsung di keadaan akhir, jadi hasilnya
    // deterministik — sekaligus membuktikan dukungan reduced-motion bekerja.
    const page = await browser.newPage({ viewport, reducedMotion: "reduce" });

    for (const route of routes) {
      const res = await page.goto(BASE + route, { waitUntil: "load" });
      if (!res?.ok()) throw new Error(`${route}: HTTP ${res?.status()}`);
      await page.evaluate(() => document.fonts.ready);
      const path = `${OUT}/${nameOf(route)}-${label}.png`;
      await page.screenshot({ path, fullPage: true });
      console.log(path);
    }

    await page.close();
  }
} finally {
  await browser?.close();
}
