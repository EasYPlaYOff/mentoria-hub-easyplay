"use client"

import { BookmarkX, Compass } from "lucide-react"
import { opportunities } from "@/lib/opportunities"
import { OpportunityCard } from "@/components/opportunity-card"

type DashboardViewProps = {
  savedIds: number[]
  onToggleSave: (id: number) => void
  onExplore: () => void
}

export function DashboardView({
  savedIds,
  onToggleSave,
  onExplore,
}: DashboardViewProps) {
  const saved = opportunities.filter((o) => savedIds.includes(o.id))

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Личный кабинет
          </h1>
          <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
            Сохранённые возможности — твой персональный список целей.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card px-5 py-3 text-center">
          <p className="text-3xl font-bold text-primary">{saved.length}</p>
          <p className="text-xs text-muted-foreground">в избранном</p>
        </div>
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <div className="rounded-2xl bg-muted p-4 text-muted-foreground">
            <BookmarkX className="size-8" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">Пока пусто</h2>
          <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Перейди в каталог и добавь интересные возможности в избранное, чтобы
            они появились здесь.
          </p>
          <button
            type="button"
            onClick={onExplore}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Compass className="size-4" aria-hidden="true" />
            Открыть каталог
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              isSaved
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}
    </section>
  )
}
