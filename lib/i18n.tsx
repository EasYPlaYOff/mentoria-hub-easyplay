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
  "nav.p2p": "P2P Помощь",
  "nav.volunteer": "Панель волонтера",
  "nav.logout": "Выйти",

  "p2p.title": "P2P Помощь",
  "p2p.subtitle":
    "Бесплатные онлайн-уроки от волонтеров и живой чат с теми, кто готов помочь прямо сейчас.",
  "p2p.scheduleTitle": "Расписание онлайн-уроков",
  "p2p.scheduleSubtitle": "Ближайшие бесплатные вебинары от волонтеров.",
  "p2p.enroll": "Записаться",
  "p2p.enrolled": "Вы записаны ✓",
  "p2p.chatTitle": "Чат с волонтерами",
  "p2p.chatSubtitle": "Задай вопрос — свободный волонтер ответит.",
  "p2p.chatPlaceholder": "Напиши свой вопрос…",
  "p2p.send": "Отправить",
  "p2p.chatGreeting":
    "Привет! Это команда волонтеров Mentoria. С чем нужна помощь?",
  "p2p.volunteerReply":
    "Привет! Я свободен в это время, давай разберем эту задачу в Zoom!",
  "p2p.you": "Вы",

  "vol.title": "Панель волонтера",
  "vol.subtitle":
    "Помогай ученикам: отвечай на активные вопросы и создавай свои онлайн-уроки.",
  "vol.feedTitle": "Лента активных вопросов",
  "vol.feedSubtitle": "Ученики, которым нужна помощь прямо сейчас.",
  "vol.respond": "Откликнуться",
  "vol.responded": "Вы связались с учеником ✓",
  "vol.empty": "Сейчас нет активных вопросов. Загляни позже!",
  "vol.createTitle": "Создать онлайн-урок",
  "vol.createSubtitle": "Урок появится в расписании у всех учеников.",
  "vol.lessonTopic": "Тема урока",
  "vol.lessonSubject": "Предмет",
  "vol.lessonTime": "Дата и время",
  "vol.create": "Создать урок",
  "vol.created": "Урок создан и опубликован!",
  "vol.myLessons": "Опубликованные уроки",

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
  "nav.p2p": "P2P Көмек",
  "nav.volunteer": "Волонтер панелі",
  "nav.logout": "Шығу",

  "p2p.title": "P2P Көмек",
  "p2p.subtitle":
    "Волонтерлерден тегін онлайн сабақтар және дәл қазір көмектесуге дайын адамдармен тікелей чат.",
  "p2p.scheduleTitle": "Онлайн сабақтар кестесі",
  "p2p.scheduleSubtitle": "Волонтерлерден жақын арадағы тегін вебинарлар.",
  "p2p.enroll": "Жазылу",
  "p2p.enrolled": "Сіз жазылдыңыз ✓",
  "p2p.chatTitle": "Волонтерлермен чат",
  "p2p.chatSubtitle": "Сұрақ қой — бос волонтер жауап береді.",
  "p2p.chatPlaceholder": "Сұрағыңды жаз…",
  "p2p.send": "Жіберу",
  "p2p.chatGreeting":
    "Сәлем! Бұл Mentoria волонтерлер командасы. Қандай көмек керек?",
  "p2p.volunteerReply":
    "Сәлем! Мен осы уақытта боспын, бұл есепті Zoom-да талдайық!",
  "p2p.you": "Сіз",

  "vol.title": "Волонтер панелі",
  "vol.subtitle":
    "Оқушыларға көмектес: белсенді сұрақтарға жауап бер және өз онлайн сабақтарыңды құр.",
  "vol.feedTitle": "Белсенді сұрақтар лентасы",
  "vol.feedSubtitle": "Дәл қазір көмек қажет оқушылар.",
  "vol.respond": "Жауап беру",
  "vol.responded": "Сіз оқушымен байланыстыңыз ✓",
  "vol.empty": "Қазір белсенді сұрақтар жоқ. Кейінірек кіріп көр!",
  "vol.createTitle": "Онлайн сабақ құру",
  "vol.createSubtitle": "Сабақ барлық оқушылардың кестесінде пайда болады.",
  "vol.lessonTopic": "Сабақ тақырыбы",
  "vol.lessonSubject": "Пән",
  "vol.lessonTime": "Күні мен уақыты",
  "vol.create": "Сабақ құру",
  "vol.created": "Сабақ құрылып, жарияланды!",
  "vol.myLessons": "Жарияланған сабақтар",

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
  "nav.p2p": "P2P Help",
  "nav.volunteer": "Volunteer panel",
  "nav.logout": "Log out",

  "p2p.title": "P2P Help",
  "p2p.subtitle":
    "Free online lessons from volunteers and a live chat with people ready to help right now.",
  "p2p.scheduleTitle": "Online lessons schedule",
  "p2p.scheduleSubtitle": "Upcoming free webinars from volunteers.",
  "p2p.enroll": "Enroll",
  "p2p.enrolled": "You're enrolled ✓",
  "p2p.chatTitle": "Chat with volunteers",
  "p2p.chatSubtitle": "Ask a question — a free volunteer will reply.",
  "p2p.chatPlaceholder": "Type your question…",
  "p2p.send": "Send",
  "p2p.chatGreeting":
    "Hi! This is the Mentoria volunteer team. What do you need help with?",
  "p2p.volunteerReply":
    "Hi! I'm free at that time, let's work through this problem on Zoom!",
  "p2p.you": "You",

  "vol.title": "Volunteer panel",
  "vol.subtitle":
    "Help students: respond to active questions and create your own online lessons.",
  "vol.feedTitle": "Active questions feed",
  "vol.feedSubtitle": "Students who need help right now.",
  "vol.respond": "Respond",
  "vol.responded": "You've reached out to the student ✓",
  "vol.empty": "No active questions right now. Check back later!",
  "vol.createTitle": "Create an online lesson",
  "vol.createSubtitle": "The lesson will appear in every student's schedule.",
  "vol.lessonTopic": "Lesson topic",
  "vol.lessonSubject": "Subject",
  "vol.lessonTime": "Date and time",
  "vol.create": "Create lesson",
  "vol.created": "Lesson created and published!",
  "vol.myLessons": "Published lessons",

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
