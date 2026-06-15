"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  categories,
  opportunities,
  type Category,
} from "@/lib/opportunities"
import { OpportunityCard } from "@/components/opportunity-card"

type CoursesViewProps = {
  savedIds: number[]
  onToggleSave: (id: number) => void
}

export function CoursesView({ savedIds, onToggleSave }: CoursesViewProps) {
  const [activeFilter, setActiveFilter] = useState<"Все" | Category>("Все")

  const filtered =
    activeFilter === "Все"
      ? opportunities
      : opportunities.filter((o) => o.category === activeFilter)

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="mb-8">
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Каталог возможностей
        </h1>
        <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Олимпиады, хакатоны, акселераторы и интенсивы для школьников.
          Выбирай направление и сохраняй то, что интересно.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveFilter(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              activeFilter === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            isSaved={savedIds.includes(opportunity.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>
    </section>
  )
}
