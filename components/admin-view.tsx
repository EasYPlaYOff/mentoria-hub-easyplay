"use client"

import { useState, type FormEvent } from "react"
import {
  Users,
  BookOpen,
  Heart,
  TrendingUp,
  PlusCircle,
  Check,
  ArrowRight,
} from "lucide-react"
import {
  categories,
  type Category,
} from "@/lib/opportunities"
import { useStore } from "@/lib/store"

type AdminViewProps = {
  onViewCatalog: () => void
}

const CATEGORY_OPTIONS = categories.filter((c) => c !== "Все") as Category[]

export function AdminView({ onViewCatalog }: AdminViewProps) {
  const { opportunities, savedIds, addOpportunity } = useStore()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<Category>(CATEGORY_OPTIONS[0])
  const [grades, setGrades] = useState("")
  const [deadline, setDeadline] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [justAdded, setJustAdded] = useState<string | null>(null)

  const byCategory = CATEGORY_OPTIONS.map((cat) => ({
    category: cat,
    count: opportunities.filter((o) => o.category === cat).length,
  }))
  const maxCount = Math.max(...byCategory.map((c) => c.count), 1)

  const stats = [
    { icon: BookOpen, label: "Всего возможностей", value: opportunities.length },
    { icon: Heart, label: "Добавлено в избранное", value: savedIds.length },
    { icon: Users, label: "Активных учеников", value: 1240 },
    { icon: TrendingUp, label: "Заявок за месяц", value: 358 },
  ]

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !grades.trim() || !deadline.trim() || !description.trim()) {
      setError("Заполни все поля формы.")
      return
    }
    setError("")
    addOpportunity({
      title: title.trim(),
      category,
      grades: grades.trim(),
      deadline: deadline.trim(),
      description: description.trim(),
    })
    setJustAdded(title.trim())
    setTitle("")
    setGrades("")
    setDeadline("")
    setDescription("")
    setCategory(CATEGORY_OPTIONS[0])
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="mb-8">
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Админка
        </h1>
        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          Обзор платформы и управление каталогом возможностей.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="inline-flex rounded-xl bg-primary/15 p-2.5 text-primary">
              <stat.icon className="size-5" aria-hidden="true" />
            </div>
            <p className="mt-3 text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Add opportunity form */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <PlusCircle className="size-5 text-primary" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Добавить возможность</h2>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Новая карточка моментально появится в каталоге.
          </p>

          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Название</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: Олимпиада по физике"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary placeholder:text-muted-foreground"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Категория</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Класс</span>
                <input
                  type="text"
                  value={grades}
                  onChange={(e) => setGrades(e.target.value)}
                  placeholder="Классы: 9–11"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary placeholder:text-muted-foreground"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Дедлайн</span>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="25 июня 2026"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary placeholder:text-muted-foreground"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Описание</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Короткое описание возможности"
                className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary placeholder:text-muted-foreground"
              />
            </label>

            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <PlusCircle className="size-4" aria-hidden="true" />
              Добавить
            </button>

            {justAdded && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--chart-4)]/40 bg-[var(--chart-4)]/10 px-4 py-3 text-sm">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <Check className="size-4 text-[var(--chart-4)]" strokeWidth={3} aria-hidden="true" />
                  «{justAdded}» добавлена в каталог
                </span>
                <button
                  type="button"
                  onClick={onViewCatalog}
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                >
                  Открыть каталог
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Distribution + catalog table */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Распределение по категориям</h2>
            <div className="mt-5 flex flex-col gap-4">
              {byCategory.map((item) => (
                <div key={item.category}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-card-foreground">{item.category}</span>
                    <span className="text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(item.count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Каталог возможностей</h2>
            <div className="mt-4 max-h-72 overflow-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="pb-2 font-medium">Название</th>
                    <th className="pb-2 font-medium">Категория</th>
                    <th className="pb-2 font-medium">Дедлайн</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities.map((o) => (
                    <tr key={o.id} className="border-b border-border/50">
                      <td className="py-2.5 pr-2 font-medium text-card-foreground">
                        {o.title}
                      </td>
                      <td className="py-2.5 pr-2 text-muted-foreground">
                        {o.category}
                      </td>
                      <td className="py-2.5 text-muted-foreground">
                        {o.deadline}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
