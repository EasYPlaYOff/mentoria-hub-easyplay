"use client"

import { Check, CalendarDays, GraduationCap, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { categoryColors, type Opportunity } from "@/lib/opportunities"

type OpportunityCardProps = {
  opportunity: Opportunity
  isSaved: boolean
  onToggleSave: (id: number) => void
}

export function OpportunityCard({
  opportunity,
  isSaved,
  onToggleSave,
}: OpportunityCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50">
      <div className="mb-4 flex items-start justify-between gap-2">
        <span
          className={cn(
            "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
            categoryColors[opportunity.category],
          )}
        >
          {opportunity.category}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          <GraduationCap className="size-3.5" aria-hidden="true" />
          {opportunity.grades}
        </span>
      </div>

      <h3 className="text-pretty text-lg font-semibold leading-snug text-card-foreground">
        {opportunity.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {opportunity.description}
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="size-4 text-primary" aria-hidden="true" />
        <span>Дедлайн:</span>
        <span className="font-medium text-card-foreground">
          {opportunity.deadline}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onToggleSave(opportunity.id)}
        aria-pressed={isSaved}
        className={cn(
          "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
          isSaved
            ? "bg-chart-4/20 text-chart-4 border border-chart-4/40"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
        )}
      >
        {isSaved ? (
          <>
            <Check className="size-4" aria-hidden="true" />
            Добавлено
          </>
        ) : (
          <>
            <Heart className="size-4" aria-hidden="true" />В избранное
          </>
        )}
      </button>
    </article>
  )
}
