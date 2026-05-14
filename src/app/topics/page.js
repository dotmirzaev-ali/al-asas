import Link from "next/link";
import { SiteHeader } from "../_components/SiteHeader";

export const metadata = {
  title: "Темы — Аль-Асас",
  description:
    "Таухид, намаз, фикх и сборники хадисов: лекции и отрывки с разметкой по темам.",
};

function TagPill({ children }) {
  return (
    <span className="rounded-full border border-asas-wood/40 bg-asas-wood/5 px-3 py-1 text-xs font-medium text-asas-green">
      {children}
    </span>
  );
}

/** @param {{ title: string; scholar: string; duration: string; tags: string[] }} props */
function LectureCard({ title, scholar, duration, tags }) {
  return (
    <li className="flex flex-col rounded-2xl border border-asas-ink/10 bg-asas-white p-5 shadow-sm transition hover:border-asas-wood/40 hover:shadow-md">
      <h3 className="text-base font-semibold leading-snug text-asas-ink">{title}</h3>
      <p className="mt-2 text-sm text-asas-ink/70">{scholar}</p>
      <p className="mt-1 text-xs font-medium tabular-nums text-asas-wood">
        {duration}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <TagPill key={t}>{t}</TagPill>
        ))}
      </div>
    </li>
  );
}

/** @param {{ arabic: string; text: string; source: string; tags: string[] }} props */
function HadithBlock({ arabic, text, source, tags }) {
  return (
    <blockquote className="rounded-xl border border-asas-ink/10 bg-asas-ink/[0.02] p-4 sm:p-5">
      <p className="text-right text-sm leading-relaxed text-asas-green" dir="rtl">
        {arabic}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-asas-ink/85">{text}</p>
      <p className="mt-2 text-xs font-medium text-asas-wood">{source}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((t) => (
          <TagPill key={t}>{t}</TagPill>
        ))}
      </div>
    </blockquote>
  );
}

const tauhidLectures = [
  {
    title: "Три основы, на которых строится вся религия",
    scholar: "Шейх Ибн Бааз",
    duration: "52 мин",
    tags: ["#таухид", "#акыда", "#основы"],
  },
  {
    title: "Рубубия, Улуhия и Асма ва-с-сыфат — простыми словами",
    scholar: "Шейх Усман аль-Хамис",
    duration: "1 ч 08 мин",
    tags: ["#единобожие", "#таухид", "#имена-и-качества"],
  },
  {
    title: "Опасность ширка и малых ассоциаций в поклонении",
    scholar: "Шейх Халид Рашид",
    duration: "44 мин",
    tags: ["#акыда", "#таухид", "#ширк"],
  },
  {
    title: "Вопросы и ответы: вера и сомнения современного человека",
    scholar: "Шейх Солих аль-Усеймин",
    duration: "36 мин",
    tags: ["#таухид", "#акыда", "#ответы"],
  },
  {
    title: "Единобожие в именах и качествах без таътиля и ташbihа",
    scholar: "Шейх Ибн Бааз",
    duration: "1 ч 21 мин",
    tags: ["#акыда", "#таухид", "#сунна"],
  },
];

const namazLectures = [
  {
    title: "От очищения до таслима: разбор рукана намаза",
    scholar: "Шейх Солих аль-Усеймин",
    duration: "1 ч 34 мин",
    tags: ["#намаз", "#фикх-намаза", "#поклонение"],
  },
  {
    title: "Забытые сунны в молитве и как их вернуть в привычку",
    scholar: "Шейх Фулейдж",
    duration: "48 мин",
    tags: ["#молитва", "#сунна", "#намаз"],
  },
  {
    title: "Молитва путника и объединение: когда это дозволено",
    scholar: "Шейх Ибн Бааз",
    duration: "29 мин",
    tags: ["#фикх-намаза", "#путник", "#намаз"],
  },
  {
    title: "Сукут и хушуъ: как удерживать сердце в ряду",
    scholar: "Шейх Халид Рашид",
    duration: "41 мин",
    tags: ["#поклонение", "#намаз", "#хушуъ"],
  },
  {
    title: "Женский намаз: одежда, место и расписание в семье",
    scholar: "Шейх Солих аль-Усеймин",
    duration: "55 мин",
    tags: ["#намаз", "#молитва", "#семья"],
  },
];

const fiqhLectures = [
  {
    title: "Сделки на маркетплейсах: комиссия, возврат и условия",
    scholar: "Шейх Солих аль-Усеймин",
    duration: "1 ч 02 мин",
    tags: ["#фикх", "#повседневный-фикх", "#торговля"],
  },
  {
    title: "Еда и напитки: что смотреть на этикетке",
    scholar: "Шейх Ибн Бааз",
    duration: "33 мин",
    tags: ["#халяль", "#харам", "#фикх"],
  },
  {
    title: "Финансовые обязательства между родственниками",
    scholar: "Шейх Халид Рашид",
    duration: "47 мин",
    tags: ["#фикх", "#повседневный-фикх", "#долги"],
  },
  {
    title: "Одежда, украшения и фото: границы дозволенного",
    scholar: "Шейх Усман аль-Хамис",
    duration: "39 мин",
    tags: ["#халяль", "#фикх", "#этикет"],
  },
  {
    title: "Пост: кто обязан, кто освобождён, типичные ошибки",
    scholar: "Шейх Солих аль-Усеймин",
    duration: "58 мин",
    tags: ["#фикх", "#пост", "#поклонение"],
  },
];

const bukhariHadiths = [
  {
    arabic:
      "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    text: "Действия оцениваются только по намерениям, и каждому человеку достаётся то, что он намеревался.",
    source: "Сахих аль-Бухари, китаб начала откровения.",
    tags: ["#намерение", "#намаз", "#искренность"],
  },
  {
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    text: "Мусульманин — тот, от чьего языка и руки в безопасности другие мусульмане.",
    source: "Сахих аль-Бухари, китаб об имане.",
    tags: ["#терпение", "#характер", "#братство"],
  },
  {
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    text: "Не усовершенствуется вера одного из вас, пока он не полюбит для брата того, что любит для себя.",
    source: "Сахих аль-Бухари, китаб об имане.",
    tags: ["#братство", "#терпение", "#нравы"],
  },
];

const muslimHadiths = [
  {
    arabic: "بَيْنَ الرَّجُلِ وَبَيْنَ الشِّرْكِ وَالْكُفْرِ تَرْكُ الصَّلَاةِ",
    text: "Между рабом и многобожием и неверием — оставление молитвы.",
    source: "Сахих Муслим, китаб об имане.",
    tags: ["#намаз", "#акыда", "#поклонение"],
  },
  {
    arabic:
      "إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى أَجْسَادِكُمْ وَلَا إِلَى صُوَرِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ",
    text: "Поистине, Аллах не смотрит на ваши тела и не на ваши лица, но смотрит на ваши сердца и ваши дела.",
    source: "Сахих Муслим, китаб аль-бирр ва-с-силья.",
    tags: ["#искренность", "#поклонение", "#терпение"],
  },
  {
    arabic: "مَنْ لَا يَرْحَمُ لَا يُرْحَمُ",
    text: "Кто не проявляет милости, к нему не будут проявлять милости.",
    source: "Сахих Муслим, китаб о благости и связи с родственниками.",
    tags: ["#прощение", "#нравы", "#повседневный-фикх"],
  },
];

export default function TopicsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-asas-ink/10 bg-gradient-to-b from-asas-green/[0.06] to-asas-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-widest text-asas-wood">
              Каталог тем
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-asas-green sm:text-4xl">
              Темы
            </h1>
            <p className="mt-4 max-w-2xl text-asas-ink/80">
              Лекции сгруппированы по направлениям: вера, поклонение и прикладной
              фикх. Ниже — также отрывки из двух главных сборников хадисов с
              пометками по темам.
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

        <div className="mx-auto max-w-6xl space-y-20 px-4 py-14 sm:px-6 lg:space-y-24 lg:px-8 lg:py-20">
          {/* Таухид */}
          <section id="tauhid" aria-labelledby="tauhid-heading">
            <h2
              id="tauhid-heading"
              className="text-2xl font-semibold text-asas-green"
            >
              Таухид
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-asas-ink/80 sm:text-base">
              Таухид — утверждение единственности Аллаха в господстве, поклонении
              и в именах и качествах. Этот раздел помогает выстроить основу веры
              и отличить суннитское понимание от искажений и нововведений.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <TagPill>#таухид</TagPill>
              <TagPill>#единобожие</TagPill>
              <TagPill>#акыда</TagPill>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tauhidLectures.map((lec) => (
                <LectureCard key={lec.title} {...lec} />
              ))}
            </ul>
          </section>

          {/* Намаз */}
          <section id="namaz" aria-labelledby="namaz-heading">
            <h2
              id="namaz-heading"
              className="text-2xl font-semibold text-asas-green"
            >
              Намаз
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-asas-ink/80 sm:text-base">
              Намаз — второй столп Ислама после двух свидетельств. Здесь собраны
              уроки по очищению, действиям молитвы, сунам и типичным вопросам
              семьи и путешественника.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <TagPill>#намаз</TagPill>
              <TagPill>#молитва</TagPill>
              <TagPill>#поклонение</TagPill>
              <TagPill>#фикх-намаза</TagPill>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {namazLectures.map((lec) => (
                <LectureCard key={lec.title} {...lec} />
              ))}
            </ul>
          </section>

          {/* Фикх */}
          <section id="fiqh" aria-labelledby="fiqh-heading">
            <h2
              id="fiqh-heading"
              className="text-2xl font-semibold text-asas-green"
            >
              Фикх
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-asas-ink/80 sm:text-base">
              Прикладной фикх переводит общие правила шариата на язык
              повседневных ситуаций: еда, сделки, семья и финансы. Материалы
              опираются на доводы и выбранные мазхабные или согласованные
              позиции учёных.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <TagPill>#фикх</TagPill>
              <TagPill>#халяль</TagPill>
              <TagPill>#харам</TagPill>
              <TagPill>#повседневный-фикх</TagPill>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fiqhLectures.map((lec) => (
                <LectureCard key={lec.title} {...lec} />
              ))}
            </ul>
          </section>

          {/* Сборники хадисов */}
          <section
            id="hadith"
            className="border-t border-asas-ink/10 pt-16 lg:pt-20"
            aria-labelledby="hadith-heading"
          >
            <h2
              id="hadith-heading"
              className="text-2xl font-semibold text-asas-green"
            >
              Сборники хадисов
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-asas-ink/80 sm:text-base">
              Короткие отрывки с арабским текстом, переводом и указанием
              источника. Хештеги помогают связать хадис с темами разделов выше.
            </p>

            <div className="mt-12 space-y-10">
              <div>
                <h3 className="text-lg font-semibold text-asas-ink">
                  Сахих аль-Бухари
                </h3>
                <div className="mt-5 space-y-5">
                  {bukhariHadiths.map((h, i) => (
                    <HadithBlock key={`bukhari-${i}`} {...h} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-asas-ink">
                  Сахих Муслим
                </h3>
                <div className="mt-5 space-y-5">
                  {muslimHadiths.map((h, i) => (
                    <HadithBlock key={`muslim-${i}`} {...h} />
                  ))}
                </div>
              </div>
            </div>
          </section>
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
