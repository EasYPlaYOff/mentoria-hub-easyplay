"use client"

import { useState, type FormEvent } from "react"
import {
  Inbox,
  Check,
  PlusCircle,
  CalendarClock,
  User as UserIcon,
  HeartHandshake,
} from "lucide-react"
import { useStore } from "@/lib/store"
import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function VolunteerView() {
  const {
    helpRequests,
    respondToRequest,
    lessons,
    addLesson,
    user,
  } = useStore()
  const t = useT()

  const [topic, setTopic] = useState("")
  const [subject, setSubject] = useState("")
  const [time, setTime] = useState("")
  const [created, setCreated] = useState(false)

  const onCreate = (e: FormEvent) => {
    e.preventDefault()
    if (!topic.trim() || !subject.trim() || !time.trim()) return
    addLesson({
      title: topic.trim(),
      subject: subject.trim(),
      time: time.trim(),
      volunteerName: user?.name ?? "Волонтер",
    })
    setTopic("")
    setSubject("")
    setTime("")
    setCreated(true)
    setTimeout(() => setCreated(false), 3000)
  }

  // Lessons published by this volunteer.
  const myLessons = lessons.filter(
    (l) => l.volunteerName === (user?.name ?? "Волонтер"),
  )

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex rounded-xl bg-primary/15 p-2.5 text-primary">
          <HeartHandshake className="size-6" aria-hidden="true" />
        </span>
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {t("vol.title")}
        </h1>
      </div>
      <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
        {t("vol.subtitle")}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Active questions feed */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Inbox className="size-5 text-primary" aria-hidden="true" />
            <h2 className="text-lg font-bold tracking-tight">
              {t("vol.feedTitle")}
            </h2>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t("vol.feedSubtitle")}
          </p>

          <ul className="mt-5 flex flex-col gap-3">
            {helpRequests.map((req) => {
              const responded = req.status === "responded"
              return (
                <li
                  key={req.id}
                  className="rounded-xl border border-border bg-background p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                      <UserIcon className="size-4 text-primary" aria-hidden="true" />
                      {req.studentName}
                    </span>
                    <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {req.subject}
                    </span>
                  </div>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {req.question}
                  </p>
                  <button
                    type="button"
                    onClick={() => respondToRequest(req.id)}
                    disabled={responded}
                    className={cn(
                      "mt-3 inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
                      responded
                        ? "cursor-default bg-primary/15 text-primary"
                        : "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                  >
                    {responded ? (
                      <>
                        <Check className="size-4" aria-hidden="true" />
                        {t("vol.responded")}
                      </>
                    ) : (
                      t("vol.respond")
                    )}
                  </button>
                </li>
              )
            })}
            {helpRequests.length === 0 && (
              <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                {t("vol.empty")}
              </li>
            )}
          </ul>
        </div>

        {/* Create lesson form */}
        <div className="flex flex-col gap-6">
          <form
            onSubmit={onCreate}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-2">
              <PlusCircle className="size-5 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-bold tracking-tight">
                {t("vol.createTitle")}
              </h2>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t("vol.createSubtitle")}
            </p>

            <div className="mt-5 flex flex-col gap-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  {t("vol.lessonTopic")}
                </span>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Разбор тригонометрии"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  {t("vol.lessonSubject")}
                </span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Математика"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  {t("vol.lessonTime")}
                </span>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Завтра, 19:00"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </label>

              {created && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
                  <Check className="size-4" aria-hidden="true" />
                  {t("vol.created")}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <PlusCircle className="size-4" aria-hidden="true" />
                {t("vol.create")}
              </button>
            </div>
          </form>

          {myLessons.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-bold tracking-tight">
                {t("vol.myLessons")}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {myLessons.map((l) => (
                  <li
                    key={l.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm"
                  >
                    <span className="min-w-0 truncate font-medium">
                      {l.title}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarClock className="size-3.5" aria-hidden="true" />
                      {l.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
