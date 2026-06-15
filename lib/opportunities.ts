export type Category = "STEM" | "Бизнес" | "Программирование"

export type Opportunity = {
  id: number
  title: string
  category: Category
  grades: string
  deadline: string
  description: string
}

export const categories: Array<"Все" | Category> = [
  "Все",
  "STEM",
  "Бизнес",
  "Программирование",
]

export const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "Жаутыковская олимпиада",
    category: "STEM",
    grades: "Классы: 9–11",
    deadline: "25 июня 2026",
    description: "Главная научно-математическая олимпиада.",
  },
  {
    id: 2,
    title: "Astana Hub AI Hackathon",
    category: "Программирование",
    grades: "Все классы",
    deadline: "18 июня 2026",
    description: "Создание MVP с использованием искусственного интеллекта.",
  },
  {
    id: 3,
    title: "Летняя стартап-школа NU",
    category: "Бизнес",
    grades: "Классы: 10–11",
    deadline: "1 июля 2026",
    description: "Интенсив по запуску первых бизнес-проектов.",
  },
  {
    id: 4,
    title: "Республиканская олимпиада по информатике",
    category: "Программирование",
    grades: "Классы: 8–11",
    deadline: "30 июня 2026",
    description: "Главное соревнование для юных программистов.",
  },
  {
    id: 5,
    title: 'Конкурс стартапов "Paperlab"',
    category: "Бизнес",
    grades: "Классы: 9–11",
    deadline: "12 июля 2026",
    description: "Исследования и социальные проекты для молодежи.",
  },
  {
    id: 6,
    title: "Олимпиада КБТУ по математике",
    category: "STEM",
    grades: "Класс: 11",
    deadline: "20 июня 2026",
    description: "Олимпиада для поступления на грант в КБТУ.",
  },
  {
    id: 7,
    title: "Сейсмо-хакатон для школьников",
    category: "STEM",
    grades: "Классы: 8–11",
    deadline: "5 июля 2026",
    description: "Решение экологических и геологических задач.",
  },
  {
    id: 8,
    title: 'Акселератор "Шокан Уолис"',
    category: "Бизнес",
    grades: "Классы: 9–11",
    deadline: "15 июля 2026",
    description: "Менторская программа для будущих лидеров.",
  },
  {
    id: 9,
    title: "Курс интенсива по Web-dev",
    category: "Программирование",
    grades: "Классы: 8–10",
    deadline: "22 июня 2026",
    description: "Быстрый старт во фронтенд-разработке.",
  },
]

export const categoryColors: Record<Category, string> = {
  STEM: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  Бизнес: "bg-chart-5/15 text-chart-5 border-chart-5/30",
  Программирование: "bg-accent/20 text-accent-foreground border-accent/40",
}
