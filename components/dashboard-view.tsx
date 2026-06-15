"use client"

import { useMemo } from "react"
import {
  BookmarkX,
  Compass,
  CalendarClock,
  GraduationCap,
  Target,
  BookOpen,
} from "lucide-react"
import { useStore, parseDeadline } from "@/lib/store"
import { courses } from "@/lib/courses"
import { OpportunityCard } from "@/components/opportunity-card"

type DashboardViewProps = {
  onExplore: () => void
}

export function DashboardView({ onExplore }: DashboardViewProps) {
  const { user, opportunities, savedIds, progress, toggleSave } = useStore()

  const saved = useMemo(
    () => opportunities.filter((o) => savedIds.includes(o.id)),
    [opportunities, savedIds],
  )

  // Upcoming deadlines from saved opportunities, nearest first.
  const deadlines = useMemo(
    () =>
      [...saved].sort(
        (a, b) => parseDeadline(a.deadline) - parseDeadline(b.deadline),
      ),
    [saved],
  )

  // Course progress derived from shared lesson completion state.
  const courseProgress = useMemo(
    () =>
      courses.map((course) => {
        const done = course.lessons.filter((l) => progress[l.id]).length
        const total = course.lessons.length
        return {
          id: course.id,
          title: course.title,
          done,
          total,
          percent: Math.round((done / total) * 100),
        }
      }),
    [progress],
  )

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Profile header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Привет, {user?.name}!
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {user?.grade && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-card-foreground">
                <GraduationCap className="size-4 text-primary" aria-hidden="true" />
                {user.grade}
              </span>
            )}
            {user?.goal && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-card-foreground">
                <Target className="size-4 text-primary" aria-hidden="true" />
                {user.goal}
              </span>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card px-5 py-3 text-center">
          <p className="text-3xl font-bold text-primary">{saved.length}</p>
          <p className="text-xs text-muted-foreground">в избранном</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming deadlines */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <CalendarClock className="size-5 text-primary" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Приближающиеся дедлайны</h2>
          </div>
          {deadlines.length === 0 ? (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Сохрани возможности из каталога, чтобы видеть их дедлайны здесь.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {deadlines.slice(0, 5).map((o) => (
                <li
                  key={o.id}
                  className="flex items-center justify-between gap-3 border-b border-border/50 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-pretty text-sm font-medium text-card-foreground">
                    {o.title}
                  </span>
                  <span className="shrink-0 text-xs font-medium text-primary">
                    {o.deadline}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Course progress */}
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Мои курсы</h2>
          </div>
          <div className="mt-5 flex flex-col gap-5">
            {courseProgress.map((c) => (
              <div key={c.id}>
                <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                  <span className="text-pretty font-medium text-card-foreground">
                    {c.title}
                  </span>
                  <span className="shrink-0 text-muted-foreground">
                    {c.done}/{c.total} · {c.percent}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${c.percent}%` }}
                    role="progressbar"
                    aria-valuenow={c.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Saved opportunities */}
      <div className="mt-10">
        <h2 className="text-balance text-2xl font-bold tracking-tight">
          Мои сохранённые возможности
        </h2>

        {saved.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <div className="rounded-2xl bg-muted p-4 text-muted-foreground">
              <BookmarkX className="size-8" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Пока пусто</h3>
            <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Перейди в каталог и добавь интересные возможности в избранное,
              чтобы они появились здесь.
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
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                isSaved
                onToggleSave={toggleSave}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
