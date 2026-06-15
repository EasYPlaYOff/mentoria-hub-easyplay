"use client"

import { Users, BookOpen, Heart, TrendingUp } from "lucide-react"
import {
  categories,
  opportunities,
  type Category,
} from "@/lib/opportunities"

type AdminViewProps = {
  savedIds: number[]
}

export function AdminView({ savedIds }: AdminViewProps) {
  const byCategory = (categories.filter((c) => c !== "Все") as Category[]).map(
    (cat) => ({
      category: cat,
      count: opportunities.filter((o) => o.category === cat).length,
    }),
  )

  const maxCount = Math.max(...byCategory.map((c) => c.count), 1)

  const stats = [
    {
      icon: BookOpen,
      label: "Всего возможностей",
      value: opportunities.length,
    },
    { icon: Heart, label: "Добавлено в избранное", value: savedIds.length },
    { icon: Users, label: "Активных учеников", value: 1240 },
    { icon: TrendingUp, label: "Заявок за месяц", value: 358 },
  ]

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
          <div className="mt-4 overflow-x-auto">
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
    </section>
  )
}
