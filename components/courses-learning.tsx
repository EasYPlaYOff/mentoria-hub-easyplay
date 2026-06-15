"use client"

import { useMemo, useState } from "react"
import { Check, ChevronDown, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { courses, type Lesson } from "@/lib/courses"
import { useStore } from "@/lib/store"
import { useT } from "@/lib/i18n"

export function CoursesLearning() {
  const { progress: completed, setLessonCompleted } = useStore()
  const t = useT()
  const [activeCourseId, setActiveCourseId] = useState(courses[0].id)
  const [activeLessonId, setActiveLessonId] = useState(courses[0].lessons[0].id)
  const [openCourseId, setOpenCourseId] = useState<string | null>(courses[0].id)

  const activeCourse = courses.find((c) => c.id === activeCourseId)!
  const activeLesson =
    activeCourse.lessons.find((l) => l.id === activeLessonId) ??
    activeCourse.lessons[0]

  const completedCount = activeCourse.lessons.filter(
    (l) => completed[l.id],
  ).length
  const progress = Math.round(
    (completedCount / activeCourse.lessons.length) * 100,
  )

  const markCompleted = (lessonId: string) => {
    setLessonCompleted(lessonId)
  }

  const selectCourse = (courseId: string) => {
    setOpenCourseId((prev) => (prev === courseId ? null : courseId))
    setActiveCourseId(courseId)
    const course = courses.find((c) => c.id === courseId)!
    setActiveLessonId(course.lessons[0].id)
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-8">
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {t("courses.title")}
        </h1>
        <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {t("courses.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-3 lg:sticky lg:top-20">
          <h2 className="px-2 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Мои курсы
          </h2>
          <ul className="flex flex-col gap-1">
            {courses.map((course) => {
              const open = openCourseId === course.id
              const done = course.lessons.filter((l) => completed[l.id]).length
              return (
                <li key={course.id}>
                  <button
                    type="button"
                    onClick={() => selectCourse(course.id)}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                      course.id === activeCourseId
                        ? "bg-primary/15 text-primary"
                        : "text-foreground hover:bg-secondary",
                    )}
                  >
                    <span className="flex-1 text-pretty">{course.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {done}/{course.lessons.length}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 transition-transform",
                        open && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {open && (
                    <ul className="mt-1 flex flex-col gap-0.5 border-l border-border pl-2">
                      {course.lessons.map((lesson) => (
                        <li key={lesson.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveCourseId(course.id)
                              setActiveLessonId(lesson.id)
                            }}
                            className={cn(
                              "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                              lesson.id === activeLessonId
                                ? "bg-secondary text-foreground"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <span
                              className={cn(
                                "inline-flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                                completed[lesson.id]
                                  ? "border-transparent bg-[var(--chart-4)] text-background"
                                  : "border-border",
                              )}
                              aria-hidden="true"
                            >
                              {completed[lesson.id] && (
                                <Check className="size-3" strokeWidth={3} />
                              )}
                            </span>
                            <span className="flex-1 text-pretty leading-snug">
                              {lesson.title}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </aside>

        {/* Main content */}
        <div className="min-w-0">
          {/* Progress */}
          <div className="mb-6 rounded-2xl border border-border bg-card p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Ваш прогресс по курсу «{activeCourse.title}»
              </span>
              <span className="text-lg font-bold text-primary">
                {progress}%
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Пройдено {completedCount} из {activeCourse.lessons.length} уроков
            </p>
          </div>

          <LessonContent
            key={activeLesson.id}
            lesson={activeLesson}
            isCompleted={Boolean(completed[activeLesson.id])}
            onCorrect={() => markCompleted(activeLesson.id)}
          />
        </div>
      </div>
    </section>
  )
}

function LessonContent({
  lesson,
  isCompleted,
  onCorrect,
}: {
  lesson: Lesson
  isCompleted: boolean
  onCorrect: () => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle")

  const labels = useMemo(() => ["А", "B", "C", "D"], [])

  const check = () => {
    if (selected === null) return
    if (selected === lesson.quiz.correctIndex) {
      setStatus("correct")
      onCorrect()
    } else {
      setStatus("wrong")
    }
  }

  return (
    <article className="rounded-2xl border border-border bg-card p-5 sm:p-7">
      <h2 className="text-balance text-2xl font-bold tracking-tight">
        {lesson.title}
      </h2>

      {/* Video player */}
      <div className="mt-5 aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
        <iframe
          key={lesson.videoUrl}
          src={lesson.videoUrl}
          title={lesson.title}
          className="size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      {/* Summary */}
      <div className="mt-6 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Конспект урока
        </h3>
        {lesson.summary.map((paragraph, i) => (
          <p key={i} className="text-pretty leading-relaxed text-foreground/90">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Quiz */}
      <div className="mt-8 rounded-xl border border-border bg-background/40 p-5">
        <div className="mb-4 flex items-center gap-2">
          <PlayCircle className="size-5 text-primary" aria-hidden="true" />
          <h3 className="text-lg font-semibold">Проверка знаний</h3>
        </div>
        <p className="mb-4 text-pretty font-medium leading-relaxed">
          {lesson.quiz.question}
        </p>

        <div className="flex flex-col gap-3">
          {lesson.quiz.options.map((option, i) => {
            const isChosen = selected === i
            const showCorrect = status === "correct" && isChosen
            const showWrong = status === "wrong" && isChosen
            return (
              <button
                key={i}
                type="button"
                disabled={status === "correct"}
                onClick={() => {
                  setSelected(i)
                  if (status === "wrong") setStatus("idle")
                }}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors disabled:cursor-default",
                  showCorrect &&
                    "border-[var(--chart-4)] bg-[var(--chart-4)]/15 text-foreground",
                  showWrong &&
                    "border-destructive bg-destructive/15 text-foreground",
                  !showCorrect &&
                    !showWrong &&
                    (isChosen
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50"),
                )}
              >
                <span
                  className={cn(
                    "inline-flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                    isChosen
                      ? "border-current"
                      : "border-border text-muted-foreground",
                  )}
                  aria-hidden="true"
                >
                  {labels[i]}
                </span>
                <span className="flex-1 text-pretty">{option}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={check}
            disabled={selected === null || status === "correct"}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Проверить ответ
          </button>

          {status === "correct" && (
            <span className="flex items-center gap-1.5 text-sm font-semibold text-[var(--chart-4)]">
              <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              Правильно! Урок отмечен как пройденный.
            </span>
          )}
          {status === "wrong" && (
            <span className="text-sm font-semibold text-destructive">
              Попробуй ещё раз!
            </span>
          )}
          {status === "idle" && isCompleted && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <Check className="size-4" aria-hidden="true" />
              Урок уже пройден
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
