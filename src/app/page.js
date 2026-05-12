function IconSprout({ className = "size-10" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M20 34V18M20 18c-2-6-8-8-12-6 4-4 10-2 12 6M20 18c2-6 8-8 12-6-4-4-10-2-12 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 34h24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSearchAnswers({ className = "size-10" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="17" cy="17" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M24 24l8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 17h10M17 12v10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLayers({ className = "size-10" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 14L20 8l14 6-14 6L6 14z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 20l14 6 14-6M6 26l14 6 14-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const audienceCards = [
  {
    title: "Новичок",
    description:
      "Пошаговый путь: основы веры, этикет и первые уроки — без перегруза терминами.",
    Icon: IconSprout,
  },
  {
    title: "Ищу ответы",
    description:
      "Краткие разъяснения по ситуациям из жизни с опорой на позиции учёных.",
    Icon: IconSearchAnswers,
  },
  {
    title: "Системное обучение",
    description:
      "Треки по фикху, тафсиру и арабскому языку с проверкой понимания.",
    Icon: IconLayers,
  },
];

const scholars = [
  { name: "Шейх Ибрагим аль-Мадани", focus: "Акыда и сира" },
  { name: "Доктор Юсуф ан-Наджди", focus: "Семья и воспитание" },
  { name: "Шейх Салим аль-Харти", focus: "Фикх поклонения" },
  { name: "Устаза Марьям аль-Касими", focus: "Тафсир и тажвид" },
];

const tags = ["#прощение", "#акыда", "#намаз", "#семья", "#тауба"];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-asas-ink/10 bg-asas-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#"
            className="text-lg font-semibold tracking-tight text-asas-green"
          >
            Аль-Асас
          </a>
          <nav className="flex items-center gap-6 text-sm font-medium text-asas-ink/90">
            <a
              href="#scholars"
              className="transition-colors hover:text-asas-green"
            >
              Учёные
            </a>
            <a href="#topics" className="transition-colors hover:text-asas-green">
              Темы
            </a>
            <a href="#search" className="transition-colors hover:text-asas-green">
              Поиск
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section
          className="border-b border-asas-ink/10 bg-gradient-to-b from-asas-green/[0.06] to-asas-white"
          aria-labelledby="hero-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <p className="text-sm font-medium uppercase tracking-widest text-asas-wood">
              Образовательная платформа
            </p>
            <h1
              id="hero-heading"
              className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-asas-green sm:text-5xl"
            >
              Знания без сомнений
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-asas-ink/80">
              Уроки, лекции и справочные материалы на русском языке — с
              указанием источников и разъяснениями учёных Ахль ас-Сунна.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#start"
                className="inline-flex h-12 items-center justify-center rounded-full bg-asas-green px-8 text-sm font-semibold text-asas-white shadow-sm transition hover:bg-asas-green/90"
              >
                С чего начать
              </a>
              <a
                href="#topics"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-asas-wood px-8 text-sm font-semibold text-asas-green transition hover:bg-asas-wood/10"
              >
                Найти по теме
              </a>
            </div>
          </div>
        </section>

        <section
          id="start"
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
          aria-labelledby="audience-heading"
        >
          <h2
            id="audience-heading"
            className="text-2xl font-semibold text-asas-green"
          >
            Выберите свой формат
          </h2>
          <p className="mt-2 max-w-2xl text-asas-ink/75">
            Три входа в платформу — в зависимости от того, где вы сейчас в
            обучении.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {audienceCards.map(({ title, description, Icon }) => (
              <li
                key={title}
                className="flex flex-col rounded-2xl border border-asas-ink/10 bg-asas-white p-6 shadow-sm transition hover:border-asas-wood/40 hover:shadow-md"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-asas-green/10 text-asas-green">
                  <Icon className="size-10" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-asas-ink">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-asas-ink/75">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="scholars"
          className="border-t border-asas-ink/10 bg-asas-ink/[0.02] py-16 sm:py-20"
          aria-labelledby="scholars-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2
              id="scholars-heading"
              className="text-2xl font-semibold text-asas-green"
            >
              Популярные учёные
            </h2>
            <p className="mt-2 max-w-2xl text-asas-ink/75">
              Подборка авторов, чьи курсы и ответы чаще всего открывают на
              платформе (демо-имена).
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {scholars.map((s) => (
                <li
                  key={s.name}
                  className="overflow-hidden rounded-2xl border border-asas-ink/10 bg-asas-white shadow-sm"
                >
                  <div
                    className="aspect-[4/3] bg-gradient-to-br from-asas-green/25 via-asas-wood/20 to-asas-white"
                    role="img"
                    aria-label={`Фото: ${s.name} (заглушка)`}
                  />
                  <div className="p-4">
                    <p className="font-semibold text-asas-ink">{s.name}</p>
                    <p className="mt-1 text-sm text-asas-ink/65">{s.focus}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="topics"
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
          aria-labelledby="tags-heading"
        >
          <h2
            id="tags-heading"
            className="text-2xl font-semibold text-asas-green"
          >
            Популярные темы
          </h2>
          <p className="mt-2 text-asas-ink/75">
            Быстрый переход к подборкам материалов по хештегам.
          </p>
          <div
            id="search"
            className="mt-8 rounded-2xl border border-asas-ink/10 bg-asas-ink/[0.02] p-4 sm:p-5"
          >
            <label htmlFor="site-search" className="sr-only">
              Поиск по платформе
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                id="site-search"
                type="search"
                placeholder="Слово, хештег или имя учёного…"
                className="h-11 w-full rounded-xl border border-asas-ink/15 bg-asas-white px-4 text-sm text-asas-ink placeholder:text-asas-ink/45 outline-none ring-asas-green/30 focus:border-asas-green/40 focus:ring-2"
                readOnly
                aria-describedby="search-hint"
              />
              <span
                id="search-hint"
                className="shrink-0 text-center text-xs font-medium uppercase tracking-wide text-asas-wood sm:px-2"
              >
                Демо
              </span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-asas-wood/50 bg-asas-wood/5 px-4 py-2 text-sm font-medium text-asas-green"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-asas-ink/10 bg-asas-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-asas-green">Аль-Асас</p>
              <p className="mt-2 max-w-xs text-sm text-asas-ink/65">
                Учебные материалы и справка. Не заменяют очную консультацию с
                муфтиятом или учёным при сложных случаях.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 text-sm sm:gap-16">
              <div>
                <p className="font-semibold text-asas-ink">Разделы</p>
                <ul className="mt-3 space-y-2 text-asas-ink/70">
                  <li>
                    <a href="#scholars" className="hover:text-asas-green">
                      Учёные
                    </a>
                  </li>
                  <li>
                    <a href="#topics" className="hover:text-asas-green">
                      Темы
                    </a>
                  </li>
                  <li>
                    <a href="#search" className="hover:text-asas-green">
                      Поиск
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-asas-ink">Контакты</p>
                <ul className="mt-3 space-y-2 text-asas-ink/70">
                  <li>support@al-asas.example</li>
                  <li>Демо-проект</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-10 border-t border-asas-ink/10 pt-8 text-center text-xs text-asas-ink/50">
            © {new Date().getFullYear()} Аль-Асас. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
