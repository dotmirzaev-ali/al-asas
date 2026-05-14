import Link from "next/link";
import { SiteHeader } from "../_components/SiteHeader";
import { scholars } from "../../data/scholars";

export const metadata = {
  title: "Учёные — Аль-Асас",
  description:
    "Преподаватели и авторы материалов платформы Аль-Асас: направления и краткие сведения.",
};

export default function ScholarsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-asas-ink/10 bg-gradient-to-b from-asas-green/[0.06] to-asas-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-widest text-asas-wood">
              Каталог
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-asas-green sm:text-4xl">
              Учёные платформы
            </h1>
            <p className="mt-4 max-w-2xl text-asas-ink/80">
              Преподаватели и авторы курсов: выберите наставника по направлению
              или перейдите к материалам с главной страницы.
            </p>
            <p className="mt-6">
              <Link
                href="/"
                className="text-sm font-semibold text-asas-green underline-offset-4 hover:underline"
              >
                ← На главную
              </Link>
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {scholars.map((s) => (
              <li
                key={s.name}
                className="flex flex-col overflow-hidden rounded-2xl border border-asas-ink/10 bg-asas-white shadow-sm transition hover:border-asas-wood/40 hover:shadow-md"
              >
                <div
                  className="aspect-[5/3] bg-gradient-to-br from-asas-green/25 via-asas-wood/20 to-asas-white"
                  aria-hidden
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-lg font-semibold text-asas-ink">{s.name}</p>
                  <p className="mt-1 text-sm font-medium text-asas-wood">
                    {s.focus}
                  </p>
                  {s.bio ? (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-asas-ink/75">
                      {s.bio}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="border-t border-asas-ink/10 bg-asas-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-asas-ink/50 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Аль-Асас
        </div>
      </footer>
    </div>
  );
}
