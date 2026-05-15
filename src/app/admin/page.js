"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { scholars as scholarsSeed } from "../../data/scholars";

const AUTH_KEY = "al-asas-admin-session";
const ADMIN_USER = "admin";
const ADMIN_PASS = "alasas2024";

/** @typedef {{ id: string; name: string; slug: string; lectures: number }} TopicRow */
/** @typedef {{ id: string; title: string; source: string; status: string }} HadithRow */
/** @typedef {{ id: string; email: string; role: string; registered: string }} UserRow */

const initialTopics = /** @type {TopicRow[]} */ ([
  { id: "1", name: "Таухид", slug: "tauhid", lectures: 28 },
  { id: "2", name: "Намаз", slug: "namaz", lectures: 34 },
  { id: "3", name: "Фикх", slug: "fiqh", lectures: 41 },
  { id: "4", name: "Семья", slug: "family", lectures: 19 },
  { id: "5", name: "Акыда", slug: "aqeedah", lectures: 52 },
]);

const initialHadiths = /** @type {HadithRow[]} */ ([
  {
    id: "h1",
    title: "О намерении в деяниях",
    source: "Сахих аль-Бухари",
    status: "Опубликован",
  },
  {
    id: "h2",
    title: "О милости и взаимоотношениях",
    source: "Сахих Муслим",
    status: "Опубликован",
  },
  {
    id: "h3",
    title: "Столпы Ислама (краткое предание)",
    source: "Сахих Муслим",
    status: "Черновик",
  },
  {
    id: "h4",
    title: "Очищение перед молитвой",
    source: "Сахих аль-Бухари",
    status: "Опубликован",
  },
]);

const initialUsers = /** @type {UserRow[]} */ ([
  {
    id: "u1",
    email: "student@example.org",
    role: "Студент",
    registered: "2025-11-02",
  },
  {
    id: "u2",
    email: "moderator@example.org",
    role: "Модератор",
    registered: "2025-09-18",
  },
  {
    id: "u3",
    email: "guest@example.org",
    role: "Гость",
    registered: "2026-01-07",
  },
]);

const navItems = [
  { id: "dashboard", label: "Главная" },
  { id: "scholars", label: "Учёные" },
  { id: "topics", label: "Темы" },
  { id: "hadiths", label: "Хадисы" },
  { id: "users", label: "Пользователи" },
  { id: "settings", label: "Настройки" },
];

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border border-asas-ink/10 bg-asas-white p-6 shadow-sm">
      <p className="text-sm font-medium text-asas-ink/60">{title}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-asas-green">
        {value}
      </p>
    </div>
  );
}

function MenuIcon({ open }) {
  return (
    <svg
      className="size-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </>
      )}
    </svg>
  );
}

/** @param {{ children: import('react').ReactNode; empty?: boolean; emptyText?: string }} props */
function TableScroll({ children, empty, emptyText }) {
  return (
    <div className="min-w-0 w-full max-w-full">
      <div className="overflow-x-auto overscroll-x-contain rounded-xl border border-asas-ink/10 [-webkit-overflow-scrolling:touch]">
        {children}
      </div>
      {empty && emptyText ? (
        <p className="border-x border-b border-asas-ink/10 p-6 text-center text-sm text-asas-ink/60">
          {emptyText}
        </p>
      ) : null}
    </div>
  );
}

export default function AdminPage() {
  const [hydrated, setHydrated] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [section, setSection] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const [scholarRows, setScholarRows] = useState(() =>
    scholarsSeed.map((s) => ({
      slug: s.slug,
      name: s.name,
      focus: s.focus,
    })),
  );

  const [topicRows, setTopicRows] = useState(initialTopics);
  const [hadithRows, setHadithRows] = useState(initialHadiths);
  const [userRows, setUserRows] = useState(initialUsers);

  useEffect(() => {
    setHydrated(true);
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem(AUTH_KEY)) {
        setAuthenticated(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const selectSection = useCallback((id) => {
    setSection(id);
    setMenuOpen(false);
  }, []);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      setAuthError("");
      if (login.trim() === ADMIN_USER && password === ADMIN_PASS) {
        try {
          sessionStorage.setItem(AUTH_KEY, "1");
        } catch {
          /* ignore */
        }
        setAuthenticated(true);
        setPassword("");
      } else {
        setAuthError("Неверный логин или пароль.");
      }
    },
    [login, password],
  );

  const handleLogout = useCallback(() => {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      /* ignore */
    }
    setAuthenticated(false);
    setLogin("");
    setPassword("");
    setSection("dashboard");
    setMenuOpen(false);
  }, []);

  const deleteScholar = useCallback((slug) => {
    if (!confirm("Удалить учёного из списка в панели?")) return;
    setScholarRows((rows) => rows.filter((r) => r.slug !== slug));
  }, []);

  const editScholar = useCallback((row) => {
    const next = window.prompt("Имя учёного", row.name);
    if (next === null || !next.trim()) return;
    setScholarRows((rows) =>
      rows.map((r) =>
        r.slug === row.slug ? { ...r, name: next.trim() } : r,
      ),
    );
  }, []);

  const deleteTopic = useCallback((id) => {
    if (!confirm("Удалить тему?")) return;
    setTopicRows((rows) => rows.filter((r) => r.id !== id));
  }, []);

  const editTopic = useCallback((row) => {
    const nextName = window.prompt("Название темы", row.name);
    if (nextName === null || !nextName.trim()) return;
    const nextSlug = window.prompt("Слаг (латиница)", row.slug);
    if (nextSlug === null || !nextSlug.trim()) return;
    setTopicRows((rows) =>
      rows.map((r) =>
        r.id === row.id
          ? { ...r, name: nextName.trim(), slug: nextSlug.trim() }
          : r,
      ),
    );
  }, []);

  const deleteHadith = useCallback((id) => {
    if (!confirm("Удалить запись?")) return;
    setHadithRows((rows) => rows.filter((r) => r.id !== id));
  }, []);

  const editHadith = useCallback((row) => {
    const title = window.prompt("Заголовок", row.title);
    if (title === null || !title.trim()) return;
    const source = window.prompt("Источник", row.source);
    if (source === null || !source.trim()) return;
    setHadithRows((rows) =>
      rows.map((r) =>
        r.id === row.id ? { ...r, title: title.trim(), source: source.trim() } : r,
      ),
    );
  }, []);

  const deleteUser = useCallback((id) => {
    if (!confirm("Удалить пользователя из списка?")) return;
    setUserRows((rows) => rows.filter((r) => r.id !== id));
  }, []);

  const editUser = useCallback((row) => {
    const email = window.prompt("Email", row.email);
    if (email === null || !email.trim()) return;
    const role = window.prompt("Роль", row.role);
    if (role === null || !role.trim()) return;
    setUserRows((rows) =>
      rows.map((r) =>
        r.id === row.id
          ? { ...r, email: email.trim(), role: role.trim() }
          : r,
      ),
    );
  }, []);

  const tableBtn =
    "inline-flex h-9 items-center justify-center rounded-lg border px-3 text-xs font-semibold transition";

  const stats = useMemo(
    () => ({
      scholars: 24,
      topics: 12,
      lectures: 186,
      hadiths: 892,
    }),
    [],
  );

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-asas-white text-asas-ink">
        <p className="text-sm text-asas-ink/60">Загрузка…</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f6f5] px-4">
        <div className="w-full max-w-md rounded-2xl border border-asas-ink/10 bg-asas-white p-8 shadow-lg">
          <h1 className="text-center text-xl font-semibold text-[#1C3A2F]">
            Аль-Асас — админ
          </h1>
          <p className="mt-2 text-center text-sm text-asas-ink/65">
            Войдите, чтобы открыть панель управления
          </p>
          <form className="mt-8 space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="admin-login"
                className="block text-xs font-semibold uppercase tracking-wide text-asas-ink/70"
              >
                Логин
              </label>
              <input
                id="admin-login"
                name="username"
                autoComplete="username"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-asas-ink/15 px-3 py-2.5 text-sm outline-none ring-[#1C3A2F]/25 focus:border-[#1C3A2F]/50 focus:ring-2"
              />
            </div>
            <div>
              <label
                htmlFor="admin-pass"
                className="block text-xs font-semibold uppercase tracking-wide text-asas-ink/70"
              >
                Пароль
              </label>
              <input
                id="admin-pass"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-asas-ink/15 px-3 py-2.5 text-sm outline-none ring-[#1C3A2F]/25 focus:border-[#1C3A2F]/50 focus:ring-2"
              />
            </div>
            {authError ? (
              <p className="text-sm font-medium text-red-700">{authError}</p>
            ) : null}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#1C3A2F] py-2.5 text-sm font-semibold text-white transition hover:bg-[#1C3A2F]/90"
            >
              Войти
            </button>
          </form>
          <p className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-[#1C3A2F] underline-offset-4 hover:underline"
            >
              На сайт
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-asas-white lg:flex-row">
      {menuOpen ? (
        <button
          type="button"
          aria-label="Закрыть меню"
          className="fixed inset-0 z-40 bg-asas-ink/50 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <aside
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(16rem,85vw)] max-w-full flex-col border-r border-white/10 bg-[#1C3A2F] text-white shadow-xl transition-transform duration-200 ease-out lg:static lg:z-auto lg:w-64 lg:shrink-0 lg:translate-x-0 lg:shadow-none ${
          menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="border-b border-white/10 px-5 py-6">
          <p className="text-lg font-semibold tracking-tight">Аль-Асас</p>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-white/50">
            Админ-панель
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectSection(item.id)}
              className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                section === item.id
                  ? "bg-white/15 text-white"
                  : "text-white/85 hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg border border-white/25 bg-white/5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Выйти
          </button>
          <p className="mt-3 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-white/60 underline-offset-2 hover:text-white hover:underline"
            >
              На сайт
            </Link>
          </p>
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 w-full flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-asas-ink/10 bg-asas-white px-4 py-3 sm:px-8 sm:py-4">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-asas-ink/15 text-asas-ink transition hover:bg-asas-ink/5 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="admin-sidebar"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <MenuIcon open={menuOpen} />
          </button>
          <h1 className="min-w-0 flex-1 truncate text-lg font-semibold text-asas-ink sm:text-xl">
            {navItems.find((n) => n.id === section)?.label ?? "Панель"}
          </h1>
        </header>

        <div className="min-w-0 flex-1 bg-asas-white px-4 py-6 sm:px-8 sm:py-8">
          {section === "dashboard" ? (
            <div className="space-y-8">
              <p className="max-w-2xl text-sm text-asas-ink/70">
                Обзор ключевых показателей платформы (условные числа для обзора).
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Учёные" value={stats.scholars} />
                <StatCard title="Темы" value={stats.topics} />
                <StatCard title="Лекции" value={stats.lectures} />
                <StatCard title="Хадисы" value={stats.hadiths} />
              </div>
            </div>
          ) : null}

          {section === "scholars" ? (
            <TableScroll
              empty={scholarRows.length === 0}
              emptyText="Список пуст. Обновите страницу, чтобы снова загрузить данные."
            >
              <table className="min-w-[36rem] w-full divide-y divide-asas-ink/10 text-left text-sm">
                <thead className="bg-asas-ink/[0.04]">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-asas-ink">
                      Имя
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-asas-ink">
                      Специализация
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-asas-ink">
                      Слаг
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-asas-ink">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-asas-ink/10 bg-asas-white">
                  {scholarRows.map((row) => (
                    <tr key={row.slug} className="hover:bg-asas-ink/[0.02]">
                      <td className="px-4 py-3 font-medium text-asas-ink">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-asas-ink/75">{row.focus}</td>
                      <td className="px-4 py-3 text-asas-ink/60">{row.slug}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => editScholar(row)}
                            className={`${tableBtn} border-asas-ink/15 bg-asas-white text-asas-green hover:border-asas-green/40`}
                          >
                            Редактировать
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteScholar(row.slug)}
                            className={`${tableBtn} border-red-200 bg-red-50 text-red-800 hover:bg-red-100`}
                          >
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScroll>
          ) : null}

          {section === "topics" ? (
            <TableScroll
              empty={topicRows.length === 0}
              emptyText="Тем не осталось."
            >
              <table className="min-w-[32rem] w-full divide-y divide-asas-ink/10 text-left text-sm">
                <thead className="bg-asas-ink/[0.04]">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-asas-ink">
                      Тема
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-asas-ink">
                      Слаг
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-asas-ink">
                      Лекций
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-asas-ink">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-asas-ink/10 bg-asas-white">
                  {topicRows.map((row) => (
                    <tr key={row.id} className="hover:bg-asas-ink/[0.02]">
                      <td className="px-4 py-3 font-medium text-asas-ink">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-asas-ink/70">{row.slug}</td>
                      <td className="px-4 py-3 tabular-nums text-asas-ink/75">
                        {row.lectures}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => editTopic(row)}
                            className={`${tableBtn} border-asas-ink/15 bg-asas-white text-asas-green hover:border-asas-green/40`}
                          >
                            Редактировать
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTopic(row.id)}
                            className={`${tableBtn} border-red-200 bg-red-50 text-red-800 hover:bg-red-100`}
                          >
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScroll>
          ) : null}

          {section === "hadiths" ? (
            <TableScroll
              empty={hadithRows.length === 0}
              emptyText="Записей нет."
            >
              <table className="min-w-[36rem] w-full divide-y divide-asas-ink/10 text-left text-sm">
                <thead className="bg-asas-ink/[0.04]">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-asas-ink">
                      Заголовок
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-asas-ink">
                      Источник
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-asas-ink">
                      Статус
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-asas-ink">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-asas-ink/10 bg-asas-white">
                  {hadithRows.map((row) => (
                    <tr key={row.id} className="hover:bg-asas-ink/[0.02]">
                      <td className="px-4 py-3 font-medium text-asas-ink">
                        {row.title}
                      </td>
                      <td className="px-4 py-3 text-asas-ink/75">
                        {row.source}
                      </td>
                      <td className="px-4 py-3 text-asas-ink/70">{row.status}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => editHadith(row)}
                            className={`${tableBtn} border-asas-ink/15 bg-asas-white text-asas-green hover:border-asas-green/40`}
                          >
                            Редактировать
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteHadith(row.id)}
                            className={`${tableBtn} border-red-200 bg-red-50 text-red-800 hover:bg-red-100`}
                          >
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScroll>
          ) : null}

          {section === "users" ? (
            <TableScroll
              empty={userRows.length === 0}
              emptyText="Пользователей в списке нет."
            >
              <table className="min-w-[36rem] w-full divide-y divide-asas-ink/10 text-left text-sm">
                <thead className="bg-asas-ink/[0.04]">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-asas-ink">
                      Email
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-asas-ink">
                      Роль
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 font-semibold text-asas-ink">
                      Регистрация
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-asas-ink">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-asas-ink/10 bg-asas-white">
                  {userRows.map((row) => (
                    <tr key={row.id} className="hover:bg-asas-ink/[0.02]">
                      <td className="px-4 py-3 font-medium text-asas-ink">
                        {row.email}
                      </td>
                      <td className="px-4 py-3 text-asas-ink/75">{row.role}</td>
                      <td className="px-4 py-3 tabular-nums text-asas-ink/70">
                        {row.registered}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => editUser(row)}
                            className={`${tableBtn} border-asas-ink/15 bg-asas-white text-asas-green hover:border-asas-green/40`}
                          >
                            Редактировать
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteUser(row.id)}
                            className={`${tableBtn} border-red-200 bg-red-50 text-red-800 hover:bg-red-100`}
                          >
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScroll>
          ) : null}

          {section === "settings" ? (
            <div className="w-full max-w-xl rounded-xl border border-asas-ink/10 bg-asas-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-asas-ink">
                Настройки
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-asas-ink/70">
                Здесь будут параметры сайта, уведомления и интеграции. Сейчас
                раздел зарезервирован под будущую конфигурацию.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
