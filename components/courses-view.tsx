"use client"

import { useMemo, useState } from "react"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { categories, type Category } from "@/lib/opportunities"
import { useStore } from "@/lib/store"
import { OpportunityCard } from "@/components/opportunity-card"

export function CoursesView() {
  const { opportunities, savedIds, user, toggleSave } = useStore()
  const [activeFilter, setActiveFilter] = useState<"Все" | Category>("Все")

  const interests = user?.interests ?? []

  const filtered = useMemo(() => {
    const base =
      activeFilter === "Все"
        ? opportunities
        : opportunities.filter((o) => o.category === activeFilter)

    // Recommended (matching interests) first
    return [...base].sort((a, b) => {
      const aRec = interests.includes(a.category) ? 0 : 1
      const bRec = interests.includes(b.category) ? 0 : 1
      return aRec - bRec
    })
  }, [opportunities, activeFilter, interests])

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
        {interests.length > 0 && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="size-4" aria-hidden="true" />
            Рекомендации подобраны по интересам: {interests.join(", ")}
          </p>
        )}
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
            onToggleSave={toggleSave}
            recommended={interests.includes(opportunity.category)}
          />
        ))}
      </div>
    </section>
  )
}
