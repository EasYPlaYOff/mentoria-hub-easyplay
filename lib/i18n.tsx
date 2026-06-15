"use client"

import { useCallback } from "react"
import { useStore, type Lang } from "@/lib/store"

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "kz", label: "KZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
]

type Dict = Record<string, string>

const ru: Dict = {
  "nav.home": "Главная",
  "nav.courses": "Курсы",
  "nav.catalog": "Каталог",
  "nav.dashboard": "Личный кабинет",
  "nav.admin": "Админка",
  "nav.logout": "Выйти",

  "home.badge": "Для школьников 8–11 классов",
  "home.title":
    "Все образовательные возможности и асинхронное обучение для школьников Казахстана в одном месте",
  "home.subtitle":
    "Mentoria Hub помогает найти олимпиады, хакатоны и менторские программы, чтобы строить сильное портфолио и поступать туда, куда мечтаешь.",
  "home.cta": "Начать обучение",
  "home.why": "Почему Mentoria Hub?",
  "home.whySubtitle":
    "Мы создали платформу для учеников 8–11 классов, чтобы образование за пределами школы было доступным, понятным и вдохновляющим.",
  "home.rec": "Рекомендовано для тебя",
  "home.recInterests": "Подобрано по твоим интересам:",
  "home.recDefault": "Возможности, которые помогут построить сильное портфолио.",
  "home.allCatalog": "Весь каталог",

  "catalog.title": "Каталог возможностей",
  "catalog.subtitle":
    "Олимпиады, хакатоны, акселераторы и интенсивы для школьников. Выбирай направление и сохраняй то, что интересно.",
  "catalog.recPrefix": "Рекомендации подобраны по интересам:",
  "filter.all": "Все",

  "courses.title": "Курсы",
  "courses.subtitle":
    "Асинхронное обучение: смотрите видео, читайте конспекты и проходите мини-тесты. Прогресс растёт по мере правильных ответов.",

  "dashboard.greeting": "Привет",
  "dashboard.saved": "в избранном",
  "dashboard.deadlines": "Приближающиеся дедлайны",
  "dashboard.myCourses": "Мои курсы",
  "dashboard.savedTitle": "Мои сохранённые возможности",
  "dashboard.tgTitle": "Уведомления в Telegram",
  "dashboard.tgText":
    "Подключи нашего бота, чтобы получать напоминания о дедлайнах прямо в мессенджере.",
  "dashboard.tgConnect": "Подключить MentoriaBot",
  "dashboard.tgConnected": "Бот успешно подключен",
  "dashboard.openCatalog": "Открыть каталог",

  "admin.title": "Админка",
  "admin.subtitle": "Обзор платформы и управление каталогом возможностей.",

  "card.forYou": "Для тебя",
  "card.apply": "Подать заявку",
  "card.site": "Официальный сайт",
}

const kz: Dict = {
  "nav.home": "Басты бет",
  "nav.courses": "Курстар",
  "nav.catalog": "Каталог",
  "nav.dashboard": "Жеке кабинет",
  "nav.admin": "Әкімшілік",
  "nav.logout": "Шығу",

  "home.badge": "8–11 сынып оқушыларына",
  "home.title":
    "Қазақстан оқушыларына арналған барлық білім мүмкіндіктері мен онлайн оқу бір жерде",
  "home.subtitle":
    "Mentoria Hub олимпиадалар, хакатондар мен тәлімгерлік бағдарламаларды табуға көмектеседі — мықты портфолио құрап, армандаған жеріңе түс.",
  "home.cta": "Оқуды бастау",
  "home.why": "Неліктен Mentoria Hub?",
  "home.whySubtitle":
    "Біз 8–11 сынып оқушыларына мектептен тыс білімді қолжетімді әрі шабыттандыратын ету үшін платформа жасадық.",
  "home.rec": "Саған ұсынылады",
  "home.recInterests": "Қызығушылықтарың бойынша таңдалды:",
  "home.recDefault": "Мықты портфолио құруға көмектесетін мүмкіндіктер.",
  "home.allCatalog": "Толық каталог",

  "catalog.title": "Мүмкіндіктер каталогы",
  "catalog.subtitle":
    "Оқушыларға арналған олимпиадалар, хакатондар, акселераторлар мен интенсивтер. Бағытыңды таңдап, ұнағанын сақта.",
  "catalog.recPrefix": "Ұсыныстар қызығушылықтарың бойынша таңдалды:",
  "filter.all": "Барлығы",

  "courses.title": "Курстар",
  "courses.subtitle":
    "Онлайн оқу: бейнелерді көріп, конспект оқып, мини-тесттер тапсыр. Дұрыс жауаптар сайын прогресс өседі.",

  "dashboard.greeting": "Сәлем",
  "dashboard.saved": "таңдаулыда",
  "dashboard.deadlines": "Жақындап келе жатқан мерзімдер",
  "dashboard.myCourses": "Менің курстарым",
  "dashboard.savedTitle": "Сақталған мүмкіндіктерім",
  "dashboard.tgTitle": "Telegram хабарламалары",
  "dashboard.tgText":
    "Мерзімдер туралы еске салуларды мессенджерден алу үшін ботты қос.",
  "dashboard.tgConnect": "MentoriaBot қосу",
  "dashboard.tgConnected": "Бот сәтті қосылды",
  "dashboard.openCatalog": "Каталогты ашу",

  "admin.title": "Әкімшілік",
  "admin.subtitle": "Платформаға шолу және мүмкіндіктер каталогын басқару.",

  "card.forYou": "Саған",
  "card.apply": "Өтінім беру",
  "card.site": "Ресми сайт",
}

const en: Dict = {
  "nav.home": "Home",
  "nav.courses": "Courses",
  "nav.catalog": "Catalog",
  "nav.dashboard": "Dashboard",
  "nav.admin": "Admin",
  "nav.logout": "Log out",

  "home.badge": "For students in grades 8–11",
  "home.title":
    "All educational opportunities and async learning for students of Kazakhstan in one place",
  "home.subtitle":
    "Mentoria Hub helps you find olympiads, hackathons and mentorship programs to build a strong portfolio and get into your dream school.",
  "home.cta": "Start learning",
  "home.why": "Why Mentoria Hub?",
  "home.whySubtitle":
    "We built a platform for students in grades 8–11 to make learning beyond school accessible, clear and inspiring.",
  "home.rec": "Recommended for you",
  "home.recInterests": "Picked based on your interests:",
  "home.recDefault": "Opportunities that help you build a strong portfolio.",
  "home.allCatalog": "Full catalog",

  "catalog.title": "Opportunities catalog",
  "catalog.subtitle":
    "Olympiads, hackathons, accelerators and intensives for students. Choose a track and save what interests you.",
  "catalog.recPrefix": "Recommendations picked by your interests:",
  "filter.all": "All",

  "courses.title": "Courses",
  "courses.subtitle":
    "Async learning: watch videos, read notes and take mini-quizzes. Your progress grows with each correct answer.",

  "dashboard.greeting": "Hi",
  "dashboard.saved": "saved",
  "dashboard.deadlines": "Upcoming deadlines",
  "dashboard.myCourses": "My courses",
  "dashboard.savedTitle": "My saved opportunities",
  "dashboard.tgTitle": "Telegram notifications",
  "dashboard.tgText":
    "Connect our bot to get deadline reminders right in your messenger.",
  "dashboard.tgConnect": "Connect MentoriaBot",
  "dashboard.tgConnected": "Bot connected successfully",
  "dashboard.openCatalog": "Open catalog",

  "admin.title": "Admin panel",
  "admin.subtitle": "Platform overview and opportunity catalog management.",

  "card.forYou": "For you",
  "card.apply": "Apply now",
  "card.site": "Official site",
}

const dictionaries: Record<Lang, Dict> = { ru, kz, en }

export function translate(lang: Lang, key: string): string {
  return dictionaries[lang]?.[key] ?? ru[key] ?? key
}

export function useT() {
  const { lang } = useStore()
  return useCallback((key: string) => translate(lang, key), [lang])
}
