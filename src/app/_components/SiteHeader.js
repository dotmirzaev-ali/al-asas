import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-asas-ink/10 bg-asas-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:py-0 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-lg font-semibold tracking-tight text-asas-green"
        >
          Аль-Асас
        </Link>
        <nav className="flex flex-wrap items-center gap-8 text-sm font-medium text-asas-ink/90 sm:justify-end">
          <Link
            href="/scholars"
            className="transition-colors hover:text-asas-green"
          >
            Учёные
          </Link>
          <Link
            href="/topics"
            className="transition-colors hover:text-asas-green"
          >
            Темы
          </Link>
          <Link
            href="/#search"
            className="transition-colors hover:text-asas-green"
          >
            Поиск
          </Link>
        </nav>
      </div>
    </header>
  );
}
