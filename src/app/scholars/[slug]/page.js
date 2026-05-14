import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../_components/SiteHeader";
import {
  getScholarBySlug,
  getScholarSlugs,
} from "../../../data/scholars";

export function generateStaticParams() {
  return getScholarSlugs().map((slug) => ({ slug }));
}

/** @param {{ params: Promise<{ slug: string }> }} props */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const scholar = getScholarBySlug(slug);
  if (!scholar) return { title: "Не найдено" };
  return {
    title: `${scholar.name} — Аль-Асас`,
    description: scholar.focus,
  };
}

/** @param {{ params: Promise<{ slug: string }> }} props */
export default async function ScholarDetailPage({ params }) {
  const { slug } = await params;
  const scholar = getScholarBySlug(slug);
  if (!scholar) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Link
            href="/scholars"
            className="text-sm font-semibold text-asas-green underline-offset-4 hover:underline"
          >
            ← К списку учёных
          </Link>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
            <div
              className="flex h-32 w-full shrink-0 items-center justify-center bg-neutral-300 sm:h-40 sm:w-40"
              aria-hidden
            >
              <span className="text-4xl font-semibold text-neutral-600 sm:text-5xl">
                {scholar.initials}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-semibold tracking-tight text-asas-green sm:text-3xl">
                {scholar.name}
              </h1>
              <p className="mt-2 text-sm font-medium text-asas-wood">
                {scholar.focus}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-asas-ink/85">
                {scholar.bio}
              </p>
              <p className="mt-8 text-sm text-asas-ink/60">
                Полный каталог лекций и статей по этому учёному появится в
                следующих обновлениях платформы.
              </p>
            </div>
          </div>
        </article>
      </main>

      <footer className="border-t border-asas-ink/10 bg-asas-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-asas-ink/50 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Аль-Асас
        </div>
      </footer>
    </div>
  );
}
